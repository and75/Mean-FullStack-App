/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */

const express = require('express');
const router = express.Router();
const Author = require('../models/author.model');
const { autenticateToken } = require('../middleware/authJwt');
const { now } = require('../db');
const coreLib = require('./../lib/core.lib');
const { authorStore } = require('./../lib/authorStore')


// retrieve all records from database
router.get('/', autenticateToken, async (req, res) => {
    try {
        const authors = await Author.find().sort('-updated')
            .populate('owner')
            .populate({ path: 'tags', model: 'tag', select: 'label' });
        res.json({ succes: true, mess: "Found " + authors.length, payload: { data: authors } })
    } catch (err) {
        console.log(err);
    }
});

// save data in to database
router.post('/add', autenticateToken, async (req, res) => {
    const dateNow = Date.now();
    const author = new Author({
        fullname : req.body.fullname,
        biography: req.body.biography,
        birthDate: req.body.birthDate,
        deathDate: req.body.deathDate,
        accessId : req.body.accessId,
        created  : dateNow,
        updated  : dateNow,
        owner    : req.owner._id,
    });
    author.save()
        .then(savedDoc => {
            coreLib.tagStore(req.body.tags, req.owner._id, savedDoc._id, 'author').then(tags => {
                savedDoc.tags = tags;
                return savedDoc.save()
            })
        })
        .then(savedDoc => {
            return coreLib.registerActivity(savedDoc, 'author', 'updated', req.owner._id)
        })
        .then(savedDoc => {
            res.json({ "success": true, mess: 'The author was created successfully', payload: { data: savedDoc } });
        }).catch((err) => {
            res.json({ succes: false, mess: "Error creating Author \n" + err, payload: { error: err } });
        });

});

// retrieve an object for specific id
router.get('/:id', autenticateToken, async (req, res) => {
    try {
        const author = await Author.findById(req.params.id)
            .populate('owner')
            //.populate('book')
            .populate({ path: 'tags', model: 'tag', select: 'label' });
        res.json({ succes: true, mess: "The author has been loaded!", payload: { data: author } });
    } catch (err) {
        res.json({ succes: false, mess: "Error loading author!", payload: { error: err } });
    }
});

// update a specific document 
router.patch('/:id', autenticateToken, async (req, res) => {
    const dateNow = Date.now();
    const author = await Author.findById(req.params.id);
    author.fullname = req.body.fullname;
    author.biography = req.body.biography;
    author.birthDate = req.body.birthDate;
    author.deathDate = req.body.deathDate;
    author.tags =  await coreLib.tagStore(req.body.tags, req.owner._id, author, 'author');
    author.accessId = req.body.accessId;
    author.updated = dateNow;
    author.save().then(savedDoc => {
        return coreLib.registerActivity('updated', savedDoc, 'author',req.owner._id)
    }).then(doc => {
        res.json({ succes: true, mess: "The author has been successfully updated", payload: { data: doc } });
    }).catch((err) => {
        res.json({ succes: false, mess: "Error updating author data" + err, payload: { error: err } });
    });
});

// delete specific document 
router.delete('/:id', autenticateToken, async (req, res) => {
        authorStore.deleteOne(req.params.id).
        then(accRes=>{
            return authorStore.cleanBookRef( req.params.id)
        })
        .then(accRes=>{
            return coreLib.cleanActivity(req.params.id);
        })
        .then(accRes=>{
            res.json({ succes: true, mess: "The author are deleted!", payload: { data: accRes } });
        })
        .catch(err=>{
            res.json({ succes: false, mess: "Error while suppressing author", payload: { error: err } });
        });
});

module.exports = router;

