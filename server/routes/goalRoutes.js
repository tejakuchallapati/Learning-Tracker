const express = require('express');
const router = express.Router();
const {
    createGoal,
    getGoals,
    updateGoal,
    deleteGoal,
} = require('../controllers/goalController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getGoals);
router.route('/create').post(protect, createGoal);
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;
