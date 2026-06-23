const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    googleLogin,
    getMe,
    logoutUser,
    updateUserProfile,
    forgotPassword,
    validateResetToken,
    resetPassword,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google', googleLogin);
router.post('/forgot-password', forgotPassword);
router.get('/reset-password/:token', validateResetToken);
router.post('/reset-password', resetPassword);
router.get('/me', protect, getMe);
router.get('/logout', logoutUser);
router.put('/profile', protect, updateUserProfile);

module.exports = router;
