const express = require('express');
const router = express.Router();
const fs = require('fs');
const Book = require('../models/book.model');
const Custumer = require('../models/customer.model');
const Drive = require('../models/drive.model');
const { autenticateToken } = require('../middleware/authJwt');
const { fileStoreUpload } = require('./../middleware/fileStore');



// retrieve all records from database
router.get('/', autenticateToken, async (req, res) => {
    try {

        const drive = await Drive.find().populate('owner').sort('-updated').populate({path:'relationschip._id', model:'book'}).exec();
        res.json({ succes: true, mess: "Found " + drive.length, payload: { data: drive } })
    } catch (err) {
        console.log(err);
    }
});

// save data in to database
router.post('/upload', autenticateToken, fileStoreUpload, async (req, res) => {
    try {
        const obj = JSON.parse(req.body.obj);

        //Register uploaded file on Drive object
        const dateNow = Date.now();
        if (obj.old) {
            try {
                updateDrive = await Drive.findOneAndUpdate({ _id: obj.old },
                    {
                        $set: {
                            title: req.targetFile.name,
                            mimetype: req.targetFile.mimetype,
                            size: req.targetFile.size,
                            path: req.uploadDir,
                            protectedByC: obj.protectedByC,
                            updated: dateNow,
                            owner: obj.owner
                        }
                    });
                return res.json({ succes: true, mess: "The pdf has been successfully uploaded", payload: { data: updateDrive } });
            } catch (error) {
                return res.json({ succes: false, mess: "Error updating book", payload: { error: err, data: obj } });
            }

        } else {
            const drive = new Drive({
                title: req.targetFile.name,
                mimetype: req.targetFile.mimetype,
                size: req.targetFile.size,
                path: req.uploadDir,
                protectedByC: obj.protectedByC,
                created: dateNow,
                updated: dateNow,
                owner: obj.owner
            });
            savedOnDrive = await drive.save();
            switch (obj.type) {
                case 'Book':
                    try {
                        const updatedBook = await Book.findByIdAndUpdate(
                            { _id: obj.id },
                            { $set: { pdf: savedOnDrive._id } },
                            { lean: true }).populate('pdf', 'owner');

                        const updateDrive = await Drive.findByIdAndUpdate(
                            { _id: savedOnDrive._id },
                            { $push: { relationschip: { _id: obj.id, type: 'Book', label: updatedBook.title } } },
                            { new: true, useFindAndModify: false });

                        return res.json({ succes: true, mess: "The pdf has been successfully uploaded", payload: { data: updatedBook } });

                    } catch (err) {
                        return res.json({ succes: false, mess: "Error updating book", payload: { error: err, data: obj } });
                    }
                    break;
                case 'Custumer':
                    console.log('Custumer ' + obj.id);
                    break;
            }
        }
    } catch (err) {
        console.log('error', err);
    }
});

// retrieve an object for specific id
router.get('/:id', autenticateToken, async (req, res) => {
    try {
        const drive = await Drive.findById(req.params.id).populate('relationschip').exec();
        res.json({ succes: true, mess: "The drive has been loaded!", payload: { data: drive } });
    } catch (err) {
        res.json({ succes: false, mess: "Error creating drive!", payload: { error: err } });
    }
});

// update a specific document 
router.patch('/:id', autenticateToken, async (req, res) => {
    try {
        const dateNow = Date.now();
        const updatedBook = await Drive.updateOne({ _id: req.params.id }, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                type: req.body.type,
                size: req.body.size,
                protectedByC: req.body.protectedByC,
                accessId: req.body.accessId,
                created: dateNow,
                updated: dateNow
            }
        });
        res.json({ succes: true, mess: "The drive has been successfully updated", payload: { data: updatedBook } });
    } catch (err) {
        res.json({ succes: false, mess: "Error updating data", payload: { error: err } });
    }
});

// delete specific document 
router.delete('/:id', autenticateToken, async (req, res) => {
    try {
        //delete related file
        const find = await Drive.findById(req.params.id);
        if (find.relationschip.length > 0) {
            find.relationschip.forEach(element => {
                switch (element.type) {
                    case 'Book':
                        const book = Book.findByIdAndUpdate(element._id, { $unset: { pdf: 1 } }, (err => {
                            console.log(err)
                        }));
                        break;
                }
            })
        }
        const deletedCustomer = await Drive.deleteOne({ _id: req.params.id });
        res.json({ succes: true, mess: "The file are deleted!", payload: { data: deletedCustomer } });
    } catch (err) {
        res.json({ succes: false, mess: "Error suppressing file", payload: { error: err } });
    }
});

router.get('/download/:id', autenticateToken, async (req, res) => {

    const drive = await Drive.findById(req.params.id);
    //res.json({ succes: true, mess: "The file are deleted!", payload: { data: drive } });
    const fileName = drive.title;
    const filePath = drive.path;
    if (fs.existsSync(filePath)) {
        
        const size = fs.statSync(filePath).size;
        const stream = fs.createReadStream(filePath);

        console.log(fileName);

        res.set({
            'Content-Disposition': `attachment; filename='${encodeURI(fileName)}'; filename*=${encodeURI(fileName)}'`,
            'Content-Type': 'application/octet-stream; charset=utf-8',
            //'Content-length': size
        });
        
        stream.on('open', () => {
            stream.pipe(res);
        })
            .on('end', function () {
                console.log('All the data in the file has been read');
            })
            .on('close', function (err) {
                console.log('Stream has been destroyed and file has been closed');
            })
            .on('error', function (err) {
                console.log(err);
            });
    }
})

module.exports = router;

