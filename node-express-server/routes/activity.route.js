const express = require('express');
const router = express.Router();
const Activity = require('../models/activity.model');
const { autenticateToken } = require('../middleware/authJwt');


// retrieve all records from database
router.get('/', autenticateToken, async (req, res) => {
    try {
        //console.log('Get activity params : ', req.query);
        let options = {};
        if(req.query.subject!='all'){
            options = {subject:req.query.subject}
        }
        const length = await Activity.countDocuments(options);
        const finded = await Activity.find(options).sort('-updated')
        .skip(req?.query.skip)
        .limit(req?.query.limit)
        .populate('subject')
        .populate('object')
        .populate('comments');
        const filtered = finded.filter(x=>x.object);
        res.json({ succes: true, mess: "Found " + finded.length +" activities", payload: { count:length, data: filtered } })
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

