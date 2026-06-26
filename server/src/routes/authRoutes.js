const express = require('express');
const {
    sendOtp,
    verifyOtp,
    getMe,
    logoutUser,
    updateUserProfile,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.get('/me', protect, getMe);
router.get('/logout', logoutUser);
router.put('/profile', protect, updateUserProfile);

module.exports = router;
