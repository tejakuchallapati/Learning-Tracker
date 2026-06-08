const express = require('express');
const router = express.Router();
const { logTime, getTimeStats } = require('../controllers/timeController');
const { protect } = require('../middleware/authMiddleware');

router.post('/log', protect, logTime);
router.get('/stats', protect, getTimeStats);

module.exports = router;
