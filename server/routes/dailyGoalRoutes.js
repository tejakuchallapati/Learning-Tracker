const express = require('express');
const router = express.Router();
const {
    createDailyGoal,
    getDailyGoals,
    updateDailyGoal,
    deleteDailyGoal,
    getDailyGoalActivity,
} = require('../controllers/dailyGoalController');
const { protect } = require('../middleware/authMiddleware');

router.get('/activity', protect, getDailyGoalActivity);
router.route('/').get(protect, getDailyGoals);
router.route('/create').post(protect, createDailyGoal);
router.route('/:id').put(protect, updateDailyGoal).delete(protect, deleteDailyGoal);

module.exports = router;
