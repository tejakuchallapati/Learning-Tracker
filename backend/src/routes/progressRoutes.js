const express = require('express');
const router = express.Router();
const { markComplete, getProgress } = require('../controllers/progressController');
const { protect } = require('../middleware/authMiddleware');

router.post('/mark-complete', protect, markComplete);
router.get('/:goalId', protect, getProgress);

module.exports = router;
