const express = require('express');
const router = express.Router();
const { registerUser, loginUser, googleLogin, logoutUser, updateUserProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google', googleLogin);
router.get('/logout', logoutUser);
router.put('/profile', protect, updateUserProfile);

module.exports = router;
