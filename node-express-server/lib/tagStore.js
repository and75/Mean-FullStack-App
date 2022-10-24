const Tag = require('../models/tag.model');
const Db = require('./../db');
class TagStoreClass {

    tags = null;
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
            Tag.findOne({ label: el }).exec((err, theDocument) => {
                if (err) {
                    reject(err.toString());
                }
                else {
                    resolve(theDocument);
                }
            })
        })
    }

    create(label, subject, obj, objModel) {
        return new Promise((resolve, reject) => {
            const tag = new Tag({
                label: label.toLowerCase(),
                accessId: 2,
                created: dateNow,
                updated: dateNow,
                owner: subject,
                relationschip: [{ id: obj._id, model: objModel }]
            })
            tag.save().then((savedDoc) => {
                resolve(savedDoc);
            }).catch(err => {
                reject(err);
            });

        }
        )
    }

    addRefToTag(tag, obj) {
        return new Promise(async (resolve, reject) => {
            if (obj) {
                Tag.findOneAndUpdate({_id:tag.id, "relationschip._id":{$ne:obj._id}},{
                    $push: {
                        relationschip:
                        {
                            _id: savedBook._id.toString(),
                            type: 'Book',
                            label: savedBook.title
                        }
                    }
                }, {new:true}).then((err, savedDoc) => {
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

    store(tags, owner, obj, objModel, returnDoc) {
        return new Promise(async (resolve, reject) => {
            if (tags && tags.length > 0) {
                let index = 0;
                let stored = [];
                try {
                    for await (element of tags) {
                        let findOne = await this.findOne(element.label);
                        if (findOne) {
                            stored[index] = await this.addRefToTag(findOne, obj, objModel);
                        } else {
                            stored[index] = await this.create(element.label, owner, objModel)
                        }
                        index += 1;
                    }
                    if (returnDoc === true) {
                        obj.tags = stored;
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
}

module.exports = { TagStoreClass: TagStoreClass };