/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */

const express = require('express');
const router = express.Router();
const Vocabulary = require('../models/vocabulary.model');
const coreLib = require('./../lib/core.lib');
const { autenticateToken } = require('../middleware/authJwt');


// retrieve all records from database
router.get('/', autenticateToken, async (req, res) => {
    try {
        const vocabularys = await Vocabulary.find().sort('-updated').populate('owner').exec();
        res.json({ succes: true, mess: "Found " + vocabularys.length, payload: { count: vocabularys.length, data: vocabularys } })
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
        res.json({ succes: true, mess: "Found " + vocabularys.length, payload: { count: vocabularys.length, data: ret } })
    } catch (err) {
        console.log(err);
    }
});

// save data in to database
router.post('/add', autenticateToken, async (req, res, next) => {
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
    vocabulary.save().then(savedDoc => {
        return coreLib.registerActivity('created', savedDoc, 'vocabulary', req.owner._id)
    }).then(doc => {
        res.json({ "success": true, mess: 'The vocabulary was created successfully', payload: { count: 1, data: doc } });
    }).catch((err) => {
        console.log(err);
        res.json({ succes: false, mess: "Error creating vocabulary data", payload: { error: err } });
    });

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
        const dateNow = Date.now();
        const term = await Vocabulary.findById(req.params.id);
        term.el = req.body.el.toLowerCase();
        term.la = req.body.la.toLowerCase();
        term.de = req.body.de.toLowerCase();
        term.en = req.body.en.toLowerCase();
        term.fr = req.body.fr.toLowerCase();
        term.it = req.body.it.toLowerCase();
        term.updated = dateNow;
        term.save().then(savedDoc => {
            return coreLib.registerActivity('updated', savedDoc, 'vocabulary', req.owner._id)
        }).then(doc => {
            res.json({ succes: true, mess: "The vocabulary has been successfully updated", payload: { data: doc } });
        }).catch((err) => {
            console.log(err);
            res.json({ succes: false, mess: "Error updating data" + err, payload: { error: err } });
        });
    }   
);

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

