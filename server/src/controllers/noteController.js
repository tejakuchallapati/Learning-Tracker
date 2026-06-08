const asyncHandler = require('express-async-handler');
const Note = require('../models/Note');

// @desc    Get all notes for logged in user
// @route   GET /api/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find({ userId: req.user.id }).sort({ date: -1 });
    res.status(200).json(notes);
});

// @desc    Get note for a specific date
// @route   GET /api/notes/date/:date
// @access  Private
const getNoteByDate = asyncHandler(async (req, res) => {
    const { date } = req.params;
    let note = await Note.findOne({ userId: req.user.id, date });
    if (!note) {
        // Return empty structure instead of failing
        note = { userId: req.user.id, date, learned: '', future: '' };
    }
    res.status(200).json(note);
});

// @desc    Save (create or update) a note for a specific date
// @route   POST /api/notes/save
// @access  Private
const saveNote = asyncHandler(async (req, res) => {
    const { date, learned, future } = req.body;

    if (!date) {
        res.status(400);
        throw new Error('Please provide a date');
    }

    let note = await Note.findOne({ userId: req.user.id, date });

    if (note) {
        note.learned = learned || '';
        note.future = future || '';
        await note.save();
    } else {
        note = await Note.create({
            userId: req.user.id,
            date,
            learned: learned || '',
            future: future || '',
        });
    }

    res.status(200).json(note);
});

// @desc    Delete note for a specific date
// @route   DELETE /api/notes/date/:date
// @access  Private
const deleteNote = asyncHandler(async (req, res) => {
    const { date } = req.params;
    const note = await Note.findOne({ userId: req.user.id, date });

    if (!note) {
        res.status(404);
        throw new Error('Note not found');
    }

    await note.deleteOne();
    res.status(200).json({ date });
});

// @desc    Get all dates that have saved notes for the user
// @route   GET /api/notes/dates
// @access  Private
const getSavedDates = asyncHandler(async (req, res) => {
    const notes = await Note.find({ userId: req.user.id })
        .select('date')
        .sort({ date: -1 });
    const dates = notes.map(n => n.date);
    res.status(200).json(dates);
});

module.exports = {
    getNotes,
    getNoteByDate,
    saveNote,
    deleteNote,
    getSavedDates,
};
