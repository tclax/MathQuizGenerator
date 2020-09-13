const express = require('express');
const router = express.Router();

//Score Model
const Score = require('../../models/Score');

// @route GET api/scores
// @desc Get All Scores
// @access Public
router.get(('/'), (req, res) => {
    Score.find()
        .sort({date: -1})
        .then(scores => res.json(scores))
});

// @route GET api/scores/leaderboard
// @desc Get all scores for the leaderboard by querying for all scores entered today.
// @access Public
router.get(('/leaderboard'), (req, res) => {
    //
    var currentDate = new Date();
    currentDate.setHours(0,0,0,0);
 
    Score.find({date: {$gte: currentDate}})
        .sort({totalCorrect: -1, hours: 1, minutes: 1, seconds: 1, centiseconds: 1, date: -1 })
        .then(scores => res.json(scores))
});

// @route POST api/scores
// @desc Create A Score
// @access Public
router.post(('/'), (req, res) => {
    const newScore = new Score({
        name: req.body.name,
        grade: req.body.grade,
        totalQuestions: req.body.totalQuestions,
        totalCorrect: req.body.totalCorrect,
        hours: req.body.hours,
        minutes: req.body.minutes,
        seconds: req.body.seconds,
        centiseconds: req.body.centiseconds,
    });

    newScore.save()
        .then(score => res.json(score));

});

// @route POST api/scores
// @desc Delete a Score
// @access Public
router.delete(('/:id'), (req, res) => {
    Score.findById(req.params.id)
        .then(score => score.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
});



module.exports = router;