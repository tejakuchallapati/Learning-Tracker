const mongoose = require('mongoose');

const noteSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        date: {
            type: String, // format YYYY-MM-DD
            required: true,
        },
        learned: {
            type: String,
            default: '',
        },
        future: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

// Ensure notes are unique per user and date
noteSchema.index({ userId: 1, date: 1 }, { unique: true });

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;
