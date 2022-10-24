const express = require('express');
const router = express.Router();
const Customer = require('../models/customer.model');
const Book = require('../models/book.model');
const Author = require('../models/author.model');
const Bookmark = require('../models/bookmark.model');
const Tag = require('../models/tag.model');
const Drive = require('../models/drive.model');
const Vocabulary = require('../models/vocabulary.model');
const Activity = require('../models/activity.model');
const { autenticateToken } = require('../middleware/authJwt');



// retrieve all records from database
router.get('/global-report', autenticateToken, async (req, res) => {
    try {
        const countUsers = await Customer.count();
        const countBook = await Book.count();
        const countAuthor = await Author.count();
        const countBookmark = await Bookmark.count();
        const countTag = await Tag.count();
        const countDrive = await Drive.count();
        const countVocabulary = await Vocabulary.count();

        const report = {
            labels : ['Users', 'Books', 'Authors', 'Drive','Bookmarks','Tags','Vocabolary'],
            dataset : [{
                data: [ countUsers, countBook, countAuthor, countDrive,countBookmark,countTag,countVocabulary]
              } ]
        }
        res.json({ succes: true, mess: "Stats results", payload: { count:'', data: report } })

    } catch (err) {
        console.log(err);
    }
});


module.exports = router;