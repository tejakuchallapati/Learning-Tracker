const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const { verifyGoogleCredential, verifyGoogleAuthCode } = require('../config/googleAuth');
const { normalizeReminderStorage } = require('../utils/reminderSchedule');
const { isAdminEmail } = require('../utils/adminAccess');
const sendEmail = require('../utils/emailService');
const { isEmailConfigured } = require('../utils/emailConfig');

const getFrontendOrigin = () => {
    const raw = process.env.FRONTEND_URL || 'http://localhost:3000';
    return raw.split(',')[0].trim().replace(/\/$/, '');
};

const generateToken = (id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not configured');
    }
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

const formatAuthResponse = (user) => ({
    _id: user.id,
    name: user.name,
    email: user.email,
    emailNotification: user.emailNotification,
    streakAlertNotification: user.streakAlertNotification,
    pushNotification: user.pushNotification,
    reminderTime: user.reminderTime,
    reminderAmPm: user.reminderAmPm,
    isAdmin: isAdminEmail(user.email),
    usesGoogleAuth: Boolean(user.googleId),
    hasPassword: Boolean(user.password),
    token: generateToken(user._id),
});

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        if (userExists.googleId) {
            throw new Error(
                'An account with this email already exists. Please sign in with Google instead.'
            );
        }
        throw new Error('User already exists with this email. Please sign in.');
    }

    // Create user
    const user = await User.create({
        name,
        email,
        password, // Password hashing is handled in User model pre-save hook
    });

    if (user) {
        res.status(201).json(formatAuthResponse(user));
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json(formatAuthResponse(user));
    } else if (user?.usesGoogleAuth?.()) {
        res.status(400);
        throw new Error(
            'This account uses Google Sign-In. Please use the "Sign in with Google" button instead of a password.'
        );
    } else {
        res.status(400);
        throw new Error('Invalid email or password');
    }
});

// @desc    Authenticate user with Google (ID token or OAuth auth code)
// @route   POST /api/auth/google
// @access  Public
const googleLogin = asyncHandler(async (req, res) => {
    const { credential, code, redirectUri } = req.body;

    if (!credential && !code) {
        res.status(400);
        throw new Error('No Google sign-in data received. Please try again.');
    }

    if (!process.env.JWT_SECRET) {
        res.status(500);
        throw new Error('Server configuration error. JWT_SECRET is not set.');
    }

    try {
        let payload;
        if (credential) {
            payload = await verifyGoogleCredential(credential);
        } else {
            payload = await verifyGoogleAuthCode(code, redirectUri || getFrontendOrigin());
        }

        const { sub: googleId, email, name, picture } = payload;

        if (!email) {
            res.status(400);
            throw new Error('Google account did not provide an email address.');
        }

        console.log('Google Auth Success for:', email);

        let user = await User.findOne({ email });

        if (!user) {
            console.log('Creating new user from Google account');
            try {
                user = await User.create({
                    name: name || email.split('@')[0],
                    email,
                    googleId,
                });
            } catch (createErr) {
                if (createErr.code === 11000) {
                    user = await User.findOne({ email });
                } else {
                    throw createErr;
                }
            }
        }

        if (user && !user.googleId) {
            console.log('Linking Google ID to existing user');
            user.googleId = googleId;
            await user.save();
        }

        if (!user) {
            res.status(500);
            throw new Error('Could not create or find your account. Please try again.');
        }

        res.json({
            ...formatAuthResponse(user),
            picture,
        });
    } catch (err) {
        console.error('Google Auth Error:', err.message);
        const status =
            err.message?.includes('GOOGLE_CLIENT_SECRET') ||
            err.message?.includes('redirect_uri')
                ? 503
                : 401;
        res.status(status);
        const message =
            err.message?.includes('Token used too late') ||
            err.message?.includes('audience')
                ? 'Google sign-in configuration mismatch. Ensure GOOGLE_CLIENT_ID on the server matches VITE_GOOGLE_CLIENT_ID on the frontend.'
                : err.message?.includes('redirect_uri')
                  ? 'Google redirect URI mismatch. In Google Cloud Console, add your site URL under Authorized redirect URIs.'
                  : `Google sign-in failed: ${err.message}`;
        throw new Error(message);
    }
});

// @desc    Get current logged-in user
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    const userId = req.user?._id || req.user?.id;
    const user = await User.findById(userId);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    const existingToken = req.headers.authorization?.startsWith('Bearer ')
        ? req.headers.authorization.split(' ')[1]
        : null;
    res.json({
        ...formatAuthResponse(user),
        token: existingToken || generateToken(user._id),
    });
});

// @desc    Logout user / clear cookie if HTTP-only approach
// @route   GET /api/auth/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
    // Since JWT tokens are typically primarily cleared client-side in localStorage,
    // this endpoint mostly serves as a confirmation.
    // However, if you add response cookies later, this is where you'd clear them.
    res.status(200).json({ message: 'User logged out successfully' });
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.bio = req.body.bio || user.bio;
        user.specialization = req.body.specialization || user.specialization;
        user.role = req.body.role || user.role;

        if (req.body.pushNotification !== undefined) {
            user.pushNotification = req.body.pushNotification;
        }
        if (req.body.emailNotification !== undefined) {
            user.emailNotification = req.body.emailNotification;
        }
        if (req.body.reminderTime !== undefined || req.body.reminderAmPm !== undefined) {
            const rawTime = req.body.reminderTime ?? user.reminderTime;
            if (!rawTime) {
                user.reminderTime = undefined;
                user.reminderAmPm = undefined;
                user.lastReminderSent = undefined;
                user.lastReminderDateKey = undefined;
            } else {
                const normalized = normalizeReminderStorage(
                    rawTime,
                    req.body.reminderAmPm ?? user.reminderAmPm ?? 'AM'
                );
                const timeChanged =
                    normalized.reminderTime !== user.reminderTime ||
                    normalized.reminderAmPm !== user.reminderAmPm;
                user.reminderTime = normalized.reminderTime;
                user.reminderAmPm = normalized.reminderAmPm;
                if (timeChanged) {
                    user.lastReminderSent = undefined;
                    user.lastReminderDateKey = undefined;
                }
            }
        }

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        const payload = {
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            bio: updatedUser.bio,
            specialization: updatedUser.specialization,
            role: updatedUser.role,
            emailNotification: updatedUser.emailNotification,
            streakAlertNotification: updatedUser.streakAlertNotification,
            pushNotification: updatedUser.pushNotification,
            reminderTime: updatedUser.reminderTime,
            reminderAmPm: updatedUser.reminderAmPm,
            isAdmin: isAdminEmail(updatedUser.email),
            usesGoogleAuth: Boolean(updatedUser.googleId),
            hasPassword: Boolean(updatedUser.password),
        };

        if (req.body.password) {
            payload.token = generateToken(updatedUser._id);
        }

        res.json(payload);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Request password reset email
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const genericMessage =
        'If an account with that email exists, we sent a password reset link. Check your inbox and spam folder.';

    if (!email?.trim()) {
        res.status(400);
        throw new Error('Please enter your email address');
    }

    const user = await User.findOne({ email: email.trim() });

    if (!user) {
        return res.json({ message: genericMessage });
    }

    if (user.usesGoogleAuth() && !user.password) {
        return res.json({
            message:
                'This account uses Google Sign-In. Go to Log in and click "Sign in with Google" — password reset does not apply to this account.',
        });
    }

    if (!isEmailConfigured()) {
        res.status(503);
        throw new Error('Password reset email is not configured on the server. Please try again later.');
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${getFrontendOrigin()}/reset-password?token=${resetToken}`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Learning Tracker — Reset your password',
            message: [
                `Hi ${user.name || 'there'},`,
                '',
                'We received a request to reset your Learning Tracker password.',
                '',
                `Reset your password (link expires in 1 hour):`,
                resetUrl,
                '',
                'If you did not request this, you can ignore this email.',
                '',
                '— Learning Tracker',
            ].join('\n'),
        });
    } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        console.error('Forgot password email failed:', err.message);
        res.status(500);
        throw new Error('Could not send reset email. Please try again in a few minutes.');
    }

    res.json({ message: genericMessage });
});

// @desc    Validate reset token before showing the form
// @route   GET /api/auth/reset-password/:token
// @access  Public
const validateResetToken = asyncHandler(async (req, res) => {
    const { token } = req.params;
    if (!token) {
        return res.json({ valid: false });
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: { $gt: Date.now() },
    }).select('+resetPasswordToken');

    res.json({ valid: Boolean(user) });
});

// @desc    Reset password with token from email
// @route   POST /api/auth/reset-password
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
    const { token, password } = req.body;

    if (!token || !password) {
        res.status(400);
        throw new Error('Please provide a new password');
    }

    if (password.length < 6) {
        res.status(400);
        throw new Error('Password must be at least 6 characters');
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: { $gt: Date.now() },
    }).select('+resetPasswordToken +resetPasswordExpire');

    if (!user) {
        res.status(400);
        throw new Error('This reset link is invalid or has expired. Please request a new one.');
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({ message: 'Password updated successfully. You can log in with your new password.' });
});

module.exports = {
    registerUser,
    loginUser,
    googleLogin,
    getMe,
    logoutUser,
    updateUserProfile,
    forgotPassword,
    validateResetToken,
    resetPassword,
};
