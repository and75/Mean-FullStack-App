const express = require('express');
const router = express.Router();
const Activity = require('../models/activity.model');
const { autenticateToken } = require('../middleware/authJwt');


// retrieve all records from database
router.get('/', autenticateToken, async (req, res) => {
    try {
        const finded = await Activity.find().populate('subject').populate('object').populate('commnetns');;
        res.json({ succes: true, mess: "Found " + finded.length +" activities", payload: { count:finded.length, data: finded } })
    } catch (err) {
        console.log(err);
    }
});

// retrieve all records from database
router.get('/find', autenticateToken, async (req, res, next) => {
    try {
        let query;
        if (req.q) {
            query = '/' + req.term + '/i';
        }
        const finded = await Activity.find(query).populate('subject').populate('object').populate('commnetns');
        res.json({ succes: true, mess: "Found " + finded.length +" activities", payload: { count:finded.length, data: finded } })
    } catch (err) {
        console.log(err);
    }
});

// delete specific document 
router.delete('/:id', autenticateToken, async (req, res) => {
    try {
        const deleted = await Activity.deleteOne({ _id: req.params.id });
        res.json({ succes: true, mess: "The activity are deleted!", payload: { data: deleted } });
    } catch (err) {
        res.json({ succes: false, mess: "Error while suppressing activity", payload: { error: err } });
    }
});

module.exports = router;

