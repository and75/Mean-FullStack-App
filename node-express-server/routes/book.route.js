/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */

const express = require('express');
const router = express.Router();
const Book = require('../models/book.model');
const { autenticateToken } = require('../middleware/authJwt');
const { now } = require('../db');
const coreLib = require('./../lib/core.lib');

// retrieve all records from database
router.get('/', autenticateToken, async (req, res) => {
    try {
        const books = await Book.find().sort('-updated')
            .populate('authors')
            .populate('owner')
            .populate('digitalSource')
            .populate({ path: 'tags', model: 'tag', select: 'label' });
        res.json({ succes: true, mess: "Found " + books.length, payload: { data: books } })
    } catch (err) {
        console.log(err);
    }
});

// save data in to database
router.post('/add', autenticateToken, async (req, res) => {
    const dateNow = Date.now();
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        lang: req.body.lang,
        pages: req.body.pages,
        abstract: req.body.abstract,
        firstEdition: req.body.firstEdition,
        currentEdition: req.body.currentEdition,
        reference: req.body.reference,
        notes: req.body.notes,
        source: req.body.source,
        digitalSource: req.body.digitalSource,
        protectedByC: req.body.protectedByC,
        accessId: req.body.accessId,
        created: dateNow,
        updated: dateNow,
        owner: req.owner._id,
    });

    book.save()
    .then(savedDoc => {
        return coreLib.authorStore(req.body.authors, req.owner._id, savedDoc, true);
    }).then(savedDoc=>{
        return coreLib.tagStore(req.body.tags, req.owner._id, savedDoc, 'book', true);
    }).then(savedDoc=>{
        return savedDoc.save();
    })
    .then(savedDoc => {
        return coreLib.registerActivity(savedDoc, 'book', 'updated', req.owner._id)
    })
    .then(savedDoc => {
        res.json({ "success": true, mess: 'The book was created successfully', payload: { data: savedDoc } });
    }).catch((err) => {
        console.log(err);
        res.json({ succes: false, mess: "Error creating Book \n" + err, payload: { error: err } });
    });

});

// retrieve an object for specific id
router.get('/:id', autenticateToken, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
            .populate('authors')
            .populate('owner')
            .populate('pdf')
            .populate('digitalSource')
            .populate({ path: 'tags', model: 'tag', select: 'label' });
        res.json({ succes: true, mess: "The book has been loaded!", payload: { data: book } });
    } catch (err) {
        res.json({ succes: false, mess: "Error loading book!", payload: {error: err} });
    }
});

// update a specific document 
router.patch('/:id', autenticateToken, async (req, res) => {

    const dateNow = Date.now();
    const book = await Book.findById(req.params.id);
    book.title = req.body.title;
    book.author = req.body.author;
    book.authors = await coreLib.authorStore(req.body.authors, req.owner._id, book);
    //console.log('BookRoute Authors : ', book.authors)
    book.lang = req.body.lang;
    book.pages = req.body.pages;
    book.abstract = req.body.abstract;
    book.firstEdition = req.body.firstEdition;
    book.currentEdition = req.body.currentEdition;
    book.reference = req.body.reference;
    book.notes = req.body.notes;
    book.source = req.body.source;
    book.digitalSource = req.body.digitalSource;
    book.tags = await coreLib.tagStore(req.body.tags, req.owner._id, book, 'book');
    book.protectedByC = req.body.protectedByC;
    book.accessId = req.body.accessId;
    book.updated = dateNow;
    book.save().then(savedDoc => {
        return coreLib.registerActivity('updated', savedDoc, 'book',req.owner._id)
    }).then(doc => {
        res.json({ succes: true, mess: "The book has been successfully updated", payload: { data: doc } });
    }).catch((err) => {
        console.log(err);
        res.json({ succes: false, mess: "Error updating book data" + err, payload: { error: err } });
    });
});

// delete specific document 
router.delete('/:id', autenticateToken, async (req, res) => {
    try {
        const deletedCustomer = await Book.deleteOne({ _id: req.params.id });
        res.json({ succes: true, mess: "The book are deleted!", payload: { data: deletedCustomer } });
    } catch (err) {
        res.json({ succes: false, mess: "Error while suppressing book", payload: { error: err } });
    }
});

module.exports = router;

