const Author = require('../models/author.model');
const Book = require('../models/book.model');
const Activity = require('../models/activity.model');

const Db = require('./../db');
const { findOneAndUpdate } = require('../models/activity.model');
class AuthorStoreClass {

    authors = null;
    subject = null;
    obj = null;
    returnDoc = null;
    db = null;

    constructor() {
        this.db = Db;
    }

    get dateNow() {
        return Date.now();
    }

    isNew(el) {
        return (el._id == 'new') ? true : false;
    }

    findOne(el) {
        return new Promise((resolve, reject) => {
            Author.findOne({ fullname: el }).session(this.session).exec((err, theDocument) => {
                if (err) {
                    reject(err.toString());
                }
                else {
                    resolve(theDocument);
                }
            })
        })
    }

    create(el, subject) {
        return new Promise((resolve, reject) => {
            const author = new Author({
                fullname: el,
                accessId: 2,
                biography: '/',
                birthDate: {},
                deathDate: {},
                books: [],
                created: this.dateNow,
                updated: this.dateNow,
                owner: subject
            })
            author.save({ session: this.session }).then((savedDoc) => {
                resolve(savedDoc);
            }).catch(err => {
                reject(err);
            });

        }
        )
    }

    deleteOne(id){
        return new Promise(async(resolve, reject)=>{
            Author.deleteOne({ _id: id })
            .then(res=>{
                resolve(id);
            })
            .catch(err=>{
                reject(err);
            })
        })
    }

    addBookRef(author, obj) {
        return new Promise(async (resolve, reject) => {
            if (obj) {
                author.books.push(obj._id)
                author.save({ session: this.session }).then((err, savedDoc) => {
                    if (err) {
                        reject(err.toString())
                    } else {
                        resolve(savedDoc);
                    }
                }).catch((err) => {
                    reject(err);
                });
            }
        })
    }

    cleanBookRef(id){
        return new Promise(async (resolve, reject)=>{
            //delete Book Ref
            const cleanBook = await Book.updateMany({authors: id}, {
                $pullAll: { authors: [id]}
            }).then(data => {
                console.log(data);
                resolve(id);
            })
            .catch(err => {
                reject(err);
            })
        })
    }

    store(authors, owner, obj, returnDoc) {
        return new Promise(async (resolve, reject) => {
            if (authors && authors.length > 0) {
                let index = 0;
                let stored = [];
                try {
                    for await (element of authors) {
                        let findOne = await this.findOne(element.fullname);
                        if (findOne) {
                            stored[index] = await this.addBookRef(findOne, obj);
                        } else {
                            stored[index] = await this.create(element.fullname, owner)
                        }
                        index += 1;
                    }
                    if (returnDoc === true) {
                        obj.authors = stored;
                        resolve(obj);
                    } else {
                        resolve(stored);
                    }
                } catch (error) {
                    reject(err.toString())
                }
            }
        })

    }

    import(authors, owner, ctrl) {
        console.log(authors);
        return new Promise(async (resolve, reject) => {
            if (authors && authors.length >= 0) {
                let index = 0;
                let imported = [];
                for await (const auth of authors) {
                    try {
                        console.log(auth);
                        let findedAuthor = await this.findOne(auth.fullname);
                        if (findedAuthor == null) {
                            imported[index] = await this.create(auth.fullname, owner);
                        } else {
                            //console.log(findedAuthor.fullname, this.dateNow)
                            imported[index] = findedAuthor;
                        }
                        index += 1;
                    } catch (error) {
                        reject(error);
                    }
                }
                resolve(imported);
            }
        })
    }

}

module.exports = { AuthorStoreClass: AuthorStoreClass };