const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ScoreSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    grade: {
        type: String,
        required: true,
    },
    totalQuestions: {
        type: Number,
        required: true,
    },
    totalCorrect: {
        type: Number,
        required: true,
    },
    hours: {
        type: Number,
        required: true,
    },
    minutes: {
        type: Number,
        required: true,
    },
    seconds: {
        type: Number,
        required: true,
    },
    centiseconds: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    }

});

module.exports = Score = mongoose.model('score', ScoreSchema);

