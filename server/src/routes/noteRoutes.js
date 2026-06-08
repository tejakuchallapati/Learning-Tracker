const express = require('express');
const router = express.Router();
const {
    getNotes,
    getNoteByDate,
    saveNote,
    deleteNote,
    getSavedDates,
} = require('../controllers/noteController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getNotes);
router.route('/dates').get(protect, getSavedDates);
router.route('/save').post(protect, saveNote);
router.route('/date/:date').get(protect, getNoteByDate).delete(protect, deleteNote);

module.exports = router;
