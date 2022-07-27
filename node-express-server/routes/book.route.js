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
            .populate('owner')
        //.populate({path:'tags', model:'tag', select:'label'});
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
        tags: req.body?.tags,
        protectedByC: req.body.protectedByC,
        accessId: req.body.accessId,
        created: dateNow,
        updated: dateNow,
        owner: req.owner._id,
    });

    try {
        const savedBook = await book.save();
        res.json({ "success": true, mess: 'The book was created successfully', payload: { data: savedBook } });
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
        const book = await Book.findById(req.params.id).populate('owner').populate('pdf').exec();
        res.json({ succes: true, mess: "The book has been loaded!", payload: { data: book } });
    } catch (err) {
        res.json({ succes: false, mess: "Error loading book!", payload: { error: err } });
    }
});

// update a specific document 
router.patch('/:id', autenticateToken, async (req, res) => {
    try {
        const dateNow = Date.now();
        /*const book = await Book.findById(req.params.id);
        book.title= req.body.title;
        book.author= req.body.author;
        book.lang=req.body.lang;
        book.pages= req.body.pages;
        book.abstract= req.body.abstract;
        book.firstEdition= req.body.firstEdition;
        book.currentEdition= req.body.currentEdition;
        book.reference= req.body.reference;
        book.notes=req.body.notes;
        book.source=req.body.source;
        book.tags=req.body.tags;
        book.protectedByC=req.body.protectedByC;
        book.accessId=req.body.accessId;
        book.updated= dateNow;
        const updatedBook = await book.save();*/

        const updatedBook = await Book.updateOne({ _id: req.params.id }, {
            $set: {
                title: req.body.title,
                author: req.body.author,
                pages: req.body.pages,
                lang: req.body.lang,
                abstract: req.body.abstract,
                firstEdition: req.body.firstEdition,
                currentEdition: req.body.currentEdition,
                reference: req.body.reference,
                notes: req.body.notes,
                source: req.body.source,
                protectedByC: req.body.protectedByC,
                tags: req.body.tags,
                accesId: req.body.accessId,
                updated: dateNow,
            }
        });

        //Store Tags
        coreLib.tagStore(updatedBook).then(async (res) => {
            const tags = res.map(x => x._id.toString());
        }).catch((err) => {
            console.error(err);
        })

        //Set Activity
        let options = {
            action: 'update',
            object: updatedBook._id,
            objModel: 'book',
            subject: req.owner._id
        }
        coreLib.registerActivity(options).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.error(err)
            }
        );
        
        res.json({ succes: true, mess: "The book has been successfully updated", payload: { data: updatedBook } });
    } catch (err) {
        res.json({ succes: false, mess: "Error updating data" + err, payload: { error: err } });
    }
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

