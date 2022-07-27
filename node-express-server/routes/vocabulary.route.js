const express = require('express');
const router = express.Router();
const Vocabulary = require('../models/vocabulary.model');
const { autenticateToken } = require('../middleware/authJwt');


// retrieve all records from database
router.get('/', autenticateToken, async (req, res) => {
    try {
        const vocabularys = await Vocabulary.find().sort('-updated').populate('owner').exec();
        res.json({ succes: true, mess: "Found " + vocabularys.length, payload: { count:vocabularys.length, data: vocabularys } })
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
        const vocabularys = await Vocabulary.find(query).select('-_id label');
        const ret = vocabularys.map(x => x.label).sort();
        res.json({ succes: true, mess: "Found " + vocabularys.length, payload: { count:vocabularys.length, data: ret } })
    } catch (err) {
        console.log(err);
    }
});

// save data in to database
const postStuff = [autenticateToken];
router.post('/add', postStuff, async (req, res, next) => {
    const dateNow = Date.now();
    const vocabulary = new Vocabulary({
        el: req.body.el.toLowerCase(),
        la: req.body.la.toLowerCase(),
        de: req.body.de.toLowerCase(),
        en: req.body.en.toLowerCase(),
        fr: req.body.fr.toLowerCase(),
        it: req.body.it.toLowerCase(),
        accessId: req.body.accessId,
        created: dateNow,
        updated: dateNow,
        owner: req.owner._id,
    });
    try {
        const saved = await vocabulary.save();
        res.locals.vocabulary = saved
        res.json({ "success": true, mess: 'The vocabulary was created successfully', payload: { count:1, data: saved } });
    } catch (err) {
        if (err.keyPattern?.email && err.code == "11000") {
            res.status(401).json({ "success": false, mess: 'The email entered has already been used', payload: { error: err.code } });
            return;
        } else {
            console.log('error', err);
        }
    }
});

// retrieve an object for specific id
router.get('/:id', autenticateToken, async (req, res) => {
    try {
        const vocabulary = await Vocabulary.findById(req.params.id).populate('owner').exec();
        res.json({ succes: true, mess: "The vocabulary has been loaded!", payload: { data: vocabulary } });
    } catch (err) {
        res.json({ succes: false, mess: "Error loading vocabulary!", payload: { error: err } });
    }
});

// retrieve an object for specific id
router.get('/find', autenticateToken, async (req, res) => {
    try {
        const vocabulary = await Vocabulary.find(req.params.id).populate('owner').exec();
        res.json({ succes: true, mess: "The vocabulary has been loaded!", payload: { data: vocabulary } });
    } catch (err) {
        res.json({ succes: false, mess: "Error loading vocabulary!", payload: { error: err } });
    }
});

// update a specific document 
router.patch('/:id', autenticateToken, async (req, res, next) => {
    try {
        const dateNow = Date.now();
        const updated = await Vocabulary.updateOne({ _id: req.params.id }, {
            $set: {
                el: req.body.el.toLowerCase(),
                la: req.body.la.toLowerCase(),
                de: req.body.de.toLowerCase(),
                en: req.body.en.toLowerCase(),
                fr: req.body.fr.toLowerCase(),
                it: req.body.it.toLowerCase(),
                updated: dateNow,
            }
        });
        res.json({ succes: true, mess: "The vocabulary has been successfully updated", payload: { data: updated } });
    } catch (err) {
        res.json({ succes: false, mess: "Error updating data", payload: { error: err } });
    }
});

// delete specific document 
router.delete('/:id', autenticateToken, async (req, res) => {
    try {
        const deleted = await Vocabulary.deleteOne({ _id: req.params.id });
        res.json({ succes: true, mess: "The vocabulary are deleted!", payload: { data: deleted } });
    } catch (err) {
        res.json({ succes: false, mess: "Error while suppressing vocabulary", payload: { error: err } });
    }
});

module.exports = router;

