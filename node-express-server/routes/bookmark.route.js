const express = require('express');
const router = express.Router();
const Bookmark = require('../models/bookmark.js');
const {autenticateToken} = require('../middleware/authJwt');


// retrieve all records from database
router.get('/', autenticateToken, async (req, res) => {
    try {
        const books = await Bookmark.find().sort('-updated').populate('owner').exec();
        res.json({ succes: true, mess: "Found " + books.length, payload: { data: books } })
    } catch (err) {
        console.log(err);
    }
});

// save data in to database
router.post('/add', autenticateToken, async (req, res) => {
    const dateNow =  Date.now();
    const bookmark = new Bookmark({
        label: req.body.label,
        url: req.body.url,
        description: req.body.description,
        accessId:req.body.accessId,
        created: dateNow,
        updated: dateNow,
        owner:req.owner._id,
    });
    try {
        const saved = await bookmark.save();
        res.json({ "success": true, mess: 'The bookmark was created successfully', payload: {data:saved} });
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
        const bookmark = await Bookmark.findById(req.params.id).populate('owner').exec();
        res.json({succes: true, mess: "The bookmark has been loaded!", payload: {data:bookmark}});
    } catch (err) {
        res.json({succes: false, mess: "Error loading bookmark!", payload: {error:err}});
    }
});

// update a specific document 
router.patch('/:id', autenticateToken, async (req, res) => {
    try {
        const dateNow = Date.now();
        const updated = await Bookmark.updateOne({ _id: req.params.id }, {
            $set: {
                label: req.body.label,
                url: req.body.url,
                description: req.body.description,
                accesId:req.body.accessId,
                updated: dateNow,
            }
        });
        res.json({succes: true, mess: "The bookmark has been successfully updated", payload:{data:updated} });
    } catch (err) {
        res.json({succes: false, mess: "Error updating data", payload: {error:err}});
    }
});

// delete specific document 
router.delete('/:id', autenticateToken, async (req, res) => {
    try {
        const deleted = await Bookmark.deleteOne({ _id: req.params.id });
        res.json({succes: true, mess: "The bookmark are deleted!", payload: {data:deleted}});
    } catch (err) {
        res.json({succes: false, mess: "Error while suppressing bookmark", payload: {error:err}});
    }
});

module.exports = router;

