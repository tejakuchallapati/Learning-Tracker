const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const {
    getOverview,
    getUsers,
    getFeedback,
    updateFeedbackStatus,
} = require('../controllers/adminController');

router.use(protect, admin);

router.get('/overview', getOverview);
router.get('/users', getUsers);
router.get('/feedback', getFeedback);
router.patch('/feedback/:id', updateFeedbackStatus);

module.exports = router;
