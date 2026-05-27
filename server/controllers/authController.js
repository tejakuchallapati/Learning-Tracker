const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || '937868886257-sgoqf4onr843odrv2518eghvog3ppm97.apps.googleusercontent.com');

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
        throw new Error('User already exists');
    }

    // Create user
    const user = await User.create({
        name,
        email,
        password, // Password hashing is handled in User model pre-save hook
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            emailNotification: user.emailNotification,
            streakAlertNotification: user.streakAlertNotification,
            pushNotification: user.pushNotification,
            reminderTime: user.reminderTime,
            reminderAmPm: user.reminderAmPm,
            token: generateToken(user._id),
        });
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
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            emailNotification: user.emailNotification,
            streakAlertNotification: user.streakAlertNotification,
            pushNotification: user.pushNotification,
            reminderTime: user.reminderTime,
            reminderAmPm: user.reminderAmPm,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
});

// @desc    Authenticate user with Google
// @route   POST /api/auth/google
// @access  Public
const googleLogin = asyncHandler(async (req, res) => {
    const { credential } = req.body;

    if (!credential) {
        res.status(400);
        throw new Error('No Google credential provided');
    }

    try {
        const googleClientId = process.env.GOOGLE_CLIENT_ID || '937868886257-sgoqf4onr843odrv2518eghvog3ppm97.apps.googleusercontent.com';
        console.log('Verifying Google Token with Audience:', googleClientId);
        
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: googleClientId,
        });

        const payload = ticket.getPayload();
        const { sub: googleId, email, name, picture } = payload;
        console.log('Google Auth Success for:', email);

        let user = await User.findOne({ email });

        if (!user) {
            console.log('Creating new user from Google account');
            user = await User.create({
                name,
                email,
                password: '',
                googleId,
            });
        } else if (!user.googleId) {
            console.log('Linking Google ID to existing user');
            user.googleId = googleId;
            await user.save();
        }

        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            picture: picture,
            emailNotification: user.emailNotification,
            streakAlertNotification: user.streakAlertNotification,
            pushNotification: user.pushNotification,
            reminderTime: user.reminderTime,
            reminderAmPm: user.reminderAmPm,
            token: generateToken(user._id),
        });
    } catch (err) {
        console.error('Google Auth Error:', err.message);
        res.status(401);
        throw new Error('Google authentication failed: ' + err.message);
    }
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

        if (req.body.emailNotification !== undefined) {
            user.emailNotification = req.body.emailNotification;
        }
        if (req.body.streakAlertNotification !== undefined) {
            user.streakAlertNotification = req.body.streakAlertNotification;
        }
        if (req.body.pushNotification !== undefined) {
            user.pushNotification = req.body.pushNotification;
        }
        if (req.body.reminderTime !== undefined) {
            user.reminderTime = req.body.reminderTime;
        }
        if (req.body.reminderAmPm !== undefined) {
            user.reminderAmPm = req.body.reminderAmPm;
        }

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
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
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

module.exports = {
    registerUser,
    loginUser,
    googleLogin,
    logoutUser,
    updateUserProfile,
};
