const express = require('express');
const router = express.Router();
const validateSession = require('../middleware/validate-session');
// const workoutlog = require('../models/workoutlog');
const WorkoutLog = require('../db').import('../models/workoutlog');

router.get('/practice', validateSession, function(req, res) {
    res.send('Hey!! This is a practice route!');
});

router.post('/create', validateSession, (req, res) => {
    const workoutlogEntry = {
        title: req.body.workoutlog.title,
        date: req.body.workoutlog.date,
        entry: req.body.workoutlog.entry,
        owner: req.user.id,    
    }
    WorkoutLog.create(workoutlogEntry)
        .then((workoutlog) => res.status(200).json(workoutlog))
        .catch((err) => res.status(500).json({ error: err }));
});

router.get("/", (req, res) => {
    WorkoutLog.findAll()
        .then((workoutlogs) => res.status(200).json(workoutlogs))
        .catch((err) => res.status(500).json({ error: err }));
});

router.get("/mine", validateSession, (req, res) => {
    let userid = req.user.id
    WorkoutLog.findAll({
            where: { owner: userid }
        })
        .then((workoutlogs) => res.status(200).json(workoutlogs))
        .catch((err) => res.status(500).json({ error: err }))
});

router.put("/:entryid",validateSession, (req, res) => {
     const query = {where: {id: req.params.entryid, owner: req.user.id }}
    WorkoutLog.update(req.body, query)
            
        .then(() => res.status(200).json({message:`Log ID #${req.params.entryid} updated`}))
        .catch((err) => res.status(500).json({ error: err }))
});

router.delete("/delete/:id", validateSession, (req, res) => {
    const query = {where: {id: req.params.id, owner: req.user.id }};

   WorkoutLog.destroy(query)   
       .then(() => res.status(200).json({message:"workoutlog entry removed"}))
       .catch((err) => res.status(500).json({ error: err }))
});


module.exports = router;