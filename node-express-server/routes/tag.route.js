/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */

const express = require('express');
const router = express.Router();
const Tag = require('../models/tag.model');
const coreLib = require('./../lib/core.lib');
const { autenticateToken } = require('../middleware/authJwt');


// retrieve all records from database
router.get('/', autenticateToken, async (req, res) => {
    try {
        const tags = await Tag.find().sort('-updated').populate('owner').exec();
        res.json({ succes: true, mess: "Found " + tags.length, payload: { data: tags } })
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
        const tags = await Tag.find(query).select('label');
        const ret = tags.map(x => x.label).sort();
        res.json({ succes: true, mess: "Found " + tags.length, payload: { data: tags } })
    } catch (err) {
        console.log(err);
    }
});

// save data in to database
const postStuff = [autenticateToken];
router.post('/add', postStuff, async (req, res, next) => {
    const dateNow = Date.now();
    const tag = new Tag({
        label: req.body.label.toLowerCase(),
        accessId: req.body.accessId,
        translations: req.body?.translations,
        created: dateNow,
        updated: dateNow,
        owner: req.owner._id,
    });
    tag.save().then(savedDoc => {
        return coreLib.registerActivity('created', savedDoc, 'tag', req.owner._id);
    }).then(savedDoc => {
        res.json({ succes: true, mess: 'The tag was created successfully', payload: { data: savedDoc } });
    }).catch(err => {
        res.json({ succes: false, mess: "Error creating tag data" + err, payload: { error: err } });
    })
});

// retrieve an object for specific id
router.get('/:id', autenticateToken, async (req, res) => {
    try {
        const tag = await Tag.findById(req.params.id).populate('owner').exec();
        res.json({ succes: true, mess: "The tag has been loaded!", payload: { data: tag } });
    } catch (err) {
        res.json({ succes: false, mess: "Error loading tag!", payload: { error: err } });
    }
});

// retrieve an object for specific id
router.get('/find', autenticateToken, async (req, res) => {
    try {
        const tag = await Tag.find(req.params.id).populate('owner').exec();
        res.json({ succes: true, mess: "The tag has been loaded!", payload: { data: tag } });
    } catch (err) {
        res.json({ succes: false, mess: "Error loading tag!", payload: { error: err } });
    }
});

// update a specific document 
router.patch('/:id', autenticateToken, async (req, res, next) => {
        const dateNow = Date.now();
        const tag = await Tag.findById(req.params.id)
        tag.label =  req.body.label.toLowerCase();
        tag.translations =  req.body.translations;
        tag.updated =  dateNow;
       
        tag.save().then(savedDoc => {
            return coreLib.registerActivity('updated', savedDoc, 'tag', req.owner._id);
        }).then(savedDoc => {
            res.json({ "succes": true, mess: 'The tag was updated successfully', payload: { data: savedDoc } });
        }).catch(err => {
            console.log(err);
            res.json({ "succes": false, mess: "Error updating data", payload: { error: err } });
        });
});

// delete specific document 
router.delete('/:id', autenticateToken, async (req, res) => {
    try {
        const deleted = await Tag.deleteOne({ _id: req.params.id });
        res.json({ succes: true, mess: "The tag are deleted!", payload: { data: deleted } });
    } catch (err) {
        res.json({ succes: false, mess: "Error while suppressing tag", payload: { error: err } });
    }
});

module.exports = router;

