const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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

    // Verify the JWT credential from Google
    const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,  
        // In a real application, ensure GOOGLE_CLIENT_ID matches what the frontend is using.
        // It provides flexibility to have multiple audiences if you have Android/iOS apps as well.
    });
    
    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
        // Create new user for first-time Google login
        user = await User.create({
            name,
            email,
            password: '', // No password for Google auth users
            googleId,
        });
    } else if (!user.googleId) {
        // User exists with email/password, link Google ID
        user.googleId = googleId;
        await user.save();
    }

    res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        picture: picture, // Send profile picture (useful for frontend UI though not saved in DB here)
        token: generateToken(user._id),
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
};
