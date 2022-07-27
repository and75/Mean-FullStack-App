const express = require('express');
const router = express.Router();
const Tag = require('../models/tag.model');
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
        const tags = await Tag.find(query).select('-_id label');
        const ret = tags.map(x => x.label).sort();
        res.json({ succes: true, mess: "Found " + tags.length, payload: { data: ret } })
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
        translations:req.body?.translations,
        created: dateNow,
        updated: dateNow,
        owner: req.owner._id,
    });
    try {
        const saved = await tag.save();
        res.locals.tag = saved
        res.json({ "success": true, mess: 'The tag was created successfully', payload: { data: saved } });
    } catch (err) {
        if (err.keyPattern?.email && err.code == "11000") {
            res.status(401).json({ "success": false, mess: 'The email entered has already been used', payload: { error: err.code } });
            return;
        } else {
            console.log('error', err);
        }
    }
    next();
}, async (req, res, next)=>{
    /*console.log(res.locals.tag);
    const tag = res.locals.tag;
    const tags = res.locals.tag.translations;
    if(tags && tags.length>0){
        const find = await Tag.find({label : {$in:tags}});
        if(find){
            const update = await Tag.findOneAndUpdate({_id:tag._id}, {$set:{translationsIds:find}});
        }
    }*/
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
    try {
        const dateNow = Date.now();
        const updated = await Tag.updateOne({ _id: req.params.id }, {
            $set: {
                label: req.body.label.toLowerCase(),
                translations: req.body.translations,
                updated: dateNow,
            }
        });
        res.json({ succes: true, mess: "The tag has been successfully updated", payload: { data: updated } });
    } catch (err) {
        res.json({ succes: false, mess: "Error updating data", payload: { error: err } });
    }
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

