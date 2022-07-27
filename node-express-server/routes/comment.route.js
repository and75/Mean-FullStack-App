const express = require('express');
const router = express.Router();
const Comment = require('../models/comment.model.js');
const {autenticateToken} = require('../middleware/authJwt');

// retrieve all records from database
router.get('/', autenticateToken, async (req, res) => {
    try {
        const books = await Comment.find().sort('-updated').populate('owner').exec();
        res.json({ succes: true, mess: "Found " + books.length, payload: { data: books } })
    } catch (err) {
        console.log(err);
    }
});

// retrieve all records from database
router.get('/for/:id', autenticateToken, async (req, res) => {
    try {
        const books = await Comment.find({relObject:req.params.id}).sort('-updated').populate('owner').exec();
        res.json({ succes: true, mess: "Found " + books.length, payload: { data: books } })
    } catch (err) {
        console.log(err);
    }
});

// save data in to database
router.post('/add', autenticateToken, async (req, res) => {
    const dateNow =  Date.now();
    const comment = new Comment({
        text: req.body.text,
        relObject: req.body.relObject,
        relType: req.body.relType,
        created: dateNow,
        updated: dateNow,
        owner:req.owner._id,
    });
    try {
        const saved = await comment.save();
        res.json({ "success": true, mess: 'The comment was created successfully', payload: {data:saved} });
    } catch (err) {
        if (err.keyPattern?.email && err.code == "11000") {
            res.status(401).json({ "success": false, mess: 'The email entered has already been used', payload: {error:err.code} });
            return;
        } else {
            console.log('error', err);
        }
    }
});

// retrieve an object for specific id
router.get('/:id', autenticateToken, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id).populate('owner').exec();
        res.json({succes: true, mess: "The comment has been loaded!", payload: {data:comment}});
    } catch (err) {
        res.json({succes: false, mess: "Error loading comment!", payload: {error:err}});
    }
});

// update a specific document 
router.patch('/:id', autenticateToken, async (req, res) => {
    try {
        const dateNow = Date.now();
        const updated = await Comment.updateOne({ _id: req.params.id }, {
            $set: {
                text: req.body.text,
                relObject: req.body.relObject,
                relType: req.body.relType,
                updated: dateNow,
                owner:req.owner._id,
            }
        });
        res.json({succes: true, mess: "The comment has been successfully updated", payload:{data:updated} });
    } catch (err) {
        res.json({succes: false, mess: "Error updating data", payload: {error:err}});
    }
});

// delete specific document 
router.delete('/:id', autenticateToken, async (req, res) => {
    try {
        const deleted = await Comment.deleteOne({ _id: req.params.id });
        res.json({succes: true, mess: "The comment are deleted!", payload: {data:deleted}});
    } catch (err) {
        res.json({succes: false, mess: "Error while suppressing comment", payload: {error:err}});
    }
});

module.exports = router;

