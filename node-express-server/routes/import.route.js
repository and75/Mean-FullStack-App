/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */

const express = require('express');
const router = express.Router();
const Book = require('../models/book.model');
const Drive = require('../models/drive.model');
const Customer = require('../models/customer.model');
const Tag = require('../models/tag.model');
const Author = require('../models/author.model');
const { AuthorStoreClass } = require('../lib/authorStore');
const Vocabulary = require('../models/vocabulary.model');
const { autenticateToken } = require('../middleware/authJwt');
const fs = require('fs/promises');
const fsSync = require('fs');
const path = require('path');
const Bookmark = require('../models/bookmark.model');
const coreLib = require('./../lib/core.lib');

// retrieve all records from database
router.get('/book', async (req, res) => {

    const action = function (data) {
        return new Promise(async (resolve, reject) => {
            try {
                let saved = [];
                let index = 0;
                const dateNow = Date.now();
                for await (element of data) {
                    let owner = await Customer.find({ username: element.owner }).exec();
                    let filePath = path.join(__dirname, '/../../data/store/', element.oldPath);
                    let size = '0000000000';
                    if (fsSync.existsSync(filePath)) {
                        size = fsSync.statSync(filePath).size;
                    }
                    let savedOnDrive = await Drive.findOne({ title: element.path });
                    if (savedOnDrive==null) {
                        let drive = new Drive({
                            title: element.path,
                            mimetype: 'application/pdf',
                            size: size,
                            path: filePath,
                            created: dateNow,
                            updated: dateNow,
                            owner: owner[0]._id
                        });
                        savedOnDrive = await drive.save();
                        console.log('savedOnDrive', savedOnDrive);
                    }

                    let savedBook = await Book.findOne({ title: element.title });
                    if (!savedBook) {
                        let book = new Book({
                            title: element.title,
                            lang: 'to insert',
                            pages: 0,
                            abstract: element.description,
                            pdf: savedOnDrive._id,
                            firstEdition: {
                                century: 'xxx',
                                bC: false,
                                year: 'xxx',
                                location: 'xxx'
                            },
                            currentEdition: {
                                century: 'xxx',
                                bC: false,
                                year: 'xxx',
                                location: 'xxx'
                            },
                            reference: element.title,
                            digitalSource: element.digitalSource,
                            protectedByC: true,
                            accessId: 2,
                            created: dateNow,
                            updated: dateNow,
                            owner: owner[0]._id,
                        })
                        savedBook = await book.save()
                        let authors = await coreLib.authorStore(element.authors, owner[0], savedBook)
                        savedBook.authors = authors;
                        await savedBook.save();
                    }
                    await Drive.findOneAndUpdate({ _id: savedOnDrive._id, "relationschip._id": { $ne: savedBook._id.toString() } },
                        {
                            $push: {
                                relationschip:
                                {
                                    _id: savedBook._id.toString(),
                                    type: 'Book',
                                    label: savedBook.title
                                }
                            }
                        }
                    );
                    saved[index] = savedBook;
                    index += 1;
                }
                resolve(saved);
            } catch (error) {
                reject(error);
            }

        })
    }

    try {
        const data = await fs.readFile('./book_new.json', { encoding: 'utf8' });
        const toImport = JSON.parse(data)
        console.log(toImport.payload.count);
        action(toImport.payload.data).then((imported) => {
            console.log('Import Book terminated')
            res.json({ succes: true, mess: "Imported " + res.length, payload: { data: imported } })
        }).catch((err) => {
            console.error(err);
        })

    } catch (err) {
        console.log(err);
    }

});

router.get('/authors', async (req, res) => {
    const action = function (data) {
        return new Promise(async (resolve, reject) => {
            try {
                let saved = [];
                let index = 0;
                const dateNow = Date.now();
                let aStC = new AuthorStoreClass();
                const mySet1 = new Set()
                for await (element of data) {
                    let owner = await Customer.find({ username: element.owner });
                    let created = await aStC.import(element.authors, owner[0], null)
                    saved[index] = created;
                    index += 1;
                }
                resolve(saved);
            } catch (error) {
                reject(error);
            }
        })
    }

    //let dataDir = path.join(__dirname, '/../../data/store/', 'elgg-data');
    try {
        const data = await fs.readFile('./book_new.json', { encoding: 'utf8' });
        const toImport = JSON.parse(data)
        console.log(toImport.payload.count);
        action(toImport.payload.data).then((imported) => {
            console.log('Import Book terminated')
            res.json({ succes: true, mess: "Imported " + res.length, payload: { data: imported } })
        }).catch((err) => {
            console.error(err);
        })

    } catch (err) {
        console.log(err);
    }

});

// retrieve all records from database
router.get('/bookmarks', async (req, res) => {

    /*    const action = function (data) {
            return new Promise((resolve, reject) => {
                try {
                    let saved = [];
                    const dateNow = Date.now();
                    data.forEach(async (element, index, array) => {
                        if(element.owner=='admin') element.owner='andrea.porcella';
                        let owner = await Customer.find({ username: element.owner }).exec();
                        
                        const bookmark = new Bookmark({
                            label: element.title,
                            url: element.address,
                            description: element.description,
                            accessId: 2,
                            created: dateNow,
                            updated: dateNow,
                            owner: owner[0]._id,
                        })
    
                        const savedBookmark = await bookmark.save();
    
                        saved[index] = savedBookmark;
    
                        if (index === array.length - 1) {
                            resolve(saved);
                        }
                    });
                } catch (error) {
                    reject(error);
                }
    
            })
        }
    
        //let dataDir = path.join(__dirname, '/../../data/store/', 'elgg-data');
        try {
            const data = await fs.readFile('./bookmarks.json', { encoding: 'utf8' });
            const toImport = JSON.parse(data)
            console.log(toImport.payload.count);
            action(toImport.payload.data).then((imported) => {
                console.log('Import Book terminated')
                res.json({ succes: true, mess: "Imported " + res.length, payload: { data: imported } })
            }).catch((err) => {
                console.error(err);
            })
        } catch (err) {
            console.log(err);
        }
        */
});


// retrieve all records from database
router.get('/tags', async (req, res) => {

    const action = function (data) {
        return new Promise((resolve, reject) => {
            try {
                let saved = [];
                const dateNow = Date.now();
                data.forEach(async (element, index, array) => {
                    //console.log(element.owenr);
                    if (element.owner == 'admin') element.owner = 'andrea.porcella';
                    let owner = await Customer.find({ username: element.owner }).exec();

                    const term = new Vocabulary({
                        el: element.el,
                        la: element.la,
                        de: element.de,
                        en: element.en,
                        fr: element.fr,
                        it: element.it,
                        accessId: 2,
                        created: dateNow,
                        updated: dateNow,
                        owner: owner[0]._id,
                    })

                    const saved = await term.save();

                    saved[index] = saved;

                    if (index === array.length - 1) {
                        resolve(saved);
                    }
                });
            } catch (error) {
                reject(error);
            }

        })
    }

    try {
        const data = await fs.readFile('./tags.json', { encoding: 'utf8' });
        const toImport = JSON.parse(data)
        console.log(toImport.payload.count);
        action(toImport.payload.data).then((imported) => {
            console.log('Import Book terminated')
            res.json({ succes: true, mess: "Imported " + res.length, payload: { data: imported } })
        }).catch((err) => {
            console.error(err);
        })
    } catch (err) {
        console.log(err);
    }
});


// retrieve an object for specific id

module.exports = router;

