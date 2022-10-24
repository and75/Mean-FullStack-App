const Tag = require('../models/tag.model');
const Author = require('../models/author.model');
const Activity = require('../models/activity.model');

/**
 * Adds time to a date. Modelled after MySQL DATE_ADD function.
 * Example: dateAdd(new Date(), 'minute', 30)  //returns 30 minutes from now.
 * https://stackoverflow.com/a/1214753/18511
 * 
 * @param date  Date to start with
 * @param interval  One of: year, quarter, month, week, day, hour, minute, second
 * @param units  Number of units of the given interval to add.
 */
const dateAdd = (date, interval, units) => {
    if (!(date instanceof Date))
        return undefined;
    var ret = new Date(date); //don't change original date
    var checkRollover = function () { if (ret.getDate() != date.getDate()) ret.setDate(0); };
    switch (String(interval).toLowerCase()) {
        case 'year': ret.setFullYear(ret.getFullYear() + units); checkRollover(); break;
        case 'quarter': ret.setMonth(ret.getMonth() + 3 * units); checkRollover(); break;
        case 'month': ret.setMonth(ret.getMonth() + units); checkRollover(); break;
        case 'week': ret.setDate(ret.getDate() + 7 * units); break;
        case 'day': ret.setDate(ret.getDate() + units); break;
        case 'hour': ret.setTime(ret.getTime() + units * 3600000); break;
        case 'minute': ret.setTime(ret.getTime() + units * 60000); break;
        case 'second': ret.setTime(ret.getTime() + units * 1000); break;
        default: ret = undefined; break;
    }
    return ret;
}

/**
 * Adds time to a date. Modelled after MySQL DATE_ADD function.
 * Example: dateAdd(new Date(), 'minute', 30)  //returns 30 minutes from now.
 * https://stackoverflow.com/a/1214753/18511
 * 
 * @param date  Date to start with
 * @param interval  One of: year, quarter, month, week, day, hour, minute, second
 * @param units  Number of units of the given interval to add.
 */


const dateMinus = (date, interval, units) => {
    console.log(date)
    if (!(date instanceof Date))
        return undefined;
    var ret = new Date(date); //don't change original date
    var checkRollover = function () { if (ret.getDate() != date.getDate()) ret.setDate(0); };
    switch (String(interval).toLowerCase()) {
        case 'year': ret.setFullYear(ret.getFullYear() - units); checkRollover(); break;
        case 'quarter': ret.setMonth(ret.getMonth() - 3 * units); checkRollover(); break;
        case 'month': ret.setMonth(ret.getMonth() - units); checkRollover(); break;
        case 'week': ret.setDate(ret.getDate() - 7 * units); break;
        case 'day': ret.setDate(ret.getDate() - units); break;
        case 'hour': ret.setTime(ret.getTime() - units * 3600000); break;
        case 'minute': ret.setTime(ret.getTime() - (units * 60000)); break;
        case 'second': ret.setTime(ret.getTime() - units * 1000); break;
        default: ret = undefined; break;
    }
    console.log('dateMinus:', ret)
    return ret;
}

const findUser = function(el){
    return new Promise((resolve, reject)=>{
        Customer.find({ username: el.owner }).exec((err, findDocument)=>{
            if(err){
                reject(null);
            } else {
                resolve(findDocument)
            }
        })
    })
}
const authorStore = async (authors, subject, obj, returnDoc) => {

    const dateNow = Date.now();
    const isNew = function (el) {
        return (el._id == 'new') ? true : false;
    }
    const findOne = function (el) {
        //console.log("existel", dateNow, el.fullname)
        return new Promise(async (resolve, reject) => {
            try {
                const doc = await Author.findOne({ fullname: el.fullname })
                resolve(doc);
            } catch (error) {
                reject(error);
            }
        })
    }
    const createAuthor = (el) => {
        return new Promise(async (resolve, reject) => {
            try {
                const author = new Author({
                    fullname: el.fullname,
                    accessId: 2,
                    biography: '/',
                    birthDate: {},
                    deathDate: {},
                    books: [obj?._id.toString()],
                    created: dateNow,
                    updated: dateNow,
                    owner: subject
                })
                let created = await author.save();
                resolve(created);
            } catch (error) {
                reject(error);
            }
        })
    }
    const addBookRef = (author) => {
        return new Promise(async (resolve, reject) => {
            try {
                if (obj) {
                    author.books.push(obj._id)
                    const saved = await author.save();
                    resolve(saved);
                }
            } catch (error) {
                reject(error);
            }
        })
    }

    return new Promise((resolve, reject) => {
        if (authors && authors.length > 0) {
            try {
                authors.forEach(async (element, index, array) => {

                    const elIsNew = isNew(element);
                    findOne(element)
                        .then((elExist) => {
                            if (elIsNew && !elExist) { return createAuthor(element) }
                            else { return addBookRef(elExist) };
                        })
                        .then((res) => {
                            authors[index] = res;
                            if (index === array.length - 1) {
                                if (returnDoc === true) {
                                    obj.authors = authors;
                                    resolve(obj);
                                } else {
                                    resolve(authors);
                                }
                            }
                        });
                });
            } catch (error) {
                console.log(error)
                reject(error);
            }
        } else {
            if (returnDoc === true) {
                obj.authors = authors;
                resolve(obj);
            } else {
                resolve(authors);
            }
        }
    })
}

const authorImport = async (authors, subject) => {

    const dateNow = Date.now();
    const isNew = function (el) {
        return (el._id == 'new') ? true : false;
    }
    const findOne = function (el) {
        //console.log("existel", dateNow, el.fullname)
        return new Promise(async (resolve, reject) => {
            try {
                Author.findOne({ fullname: el.fullname }).then((doc)=>{
                    resolve(doc);
                })
                
            } catch (error) {
                reject(error);
            }
        })
    }
    const createAuthor = (el) => {
        return new Promise((resolve, reject) => {
            try {
                const author = new Author({
                    fullname: el.fullname,
                    accessId: 2,
                    biography: '/',
                    birthDate: {},
                    deathDate: {},
                    books: [],
                    created: dateNow,
                    updated: dateNow,
                    owner: subject
                })
                author.save().then(savedDoc=>{
                    resolve(doc);
                });
                
            } catch (error) {
                reject(error);
            }
        })
    }

    return new Promise((resolve, reject) => {
        if (authors && authors.length > 0) {
            try {
                authors.forEach( (element, index, array) => {
                    const elIsNew = isNew(element);
                    //console.log('Author Import', element);
                    findOne(element)
                        .then((elExist) => {
                            //console.log('Author elExist', elExist);
                            if (elIsNew && !elExist) { return createAuthor(element) }
                            else {
                                authors[index]['isNew'] = false;
                                console.log('Author elExist', authors[index], index, array.length);
                                resolve( authors[index]);
                            }
                        })
                        .then((res) => {
                            if(res){
                                authors[index] = res;
                                authors[index]['isNew'] = true;
                                resolve(authors);
                            }
                        });
                });
            } catch (error) {
                console.log(error)
                reject(error);
            }
        } else {
            reject(error);

        }
    })
}

const tagStore = async (tags, subject, obj, objModel, returnDoc) => {
    //console.log('TagStore tags',tags)
    const dateNow = Date.now();
    const isNewTag = async (element) => {
        let isNew = (element._id == 'new') ? true : false;
        //console.log('isNew',tags)
        return isNew
    }
    const existTag = async (element) => {
        let exist = await Tag.exists({ label: element.label });
        console.log('existTag', element.label, exist)
        return exist ? exist : false;
    }

    const createTag = async (element) => {
        const term = new Tag({
            label: element.label.toLowerCase(),
            accessId: 2,
            created: dateNow,
            updated: dateNow,
            owner: subject,
            relationschip: [{ id: obj._id, model: objModel }]
        })
        let created = await term.save();
        return created;
    }
    const addTagRef = async (id) => {
        let exist = await Tag.findById(id);
        //console.log('addTagRef ',exist.label);
        exist.relationschip.push({ id: obj._id.toString(), model: objModel });
        await exist.save();
        return exist;
    }
    return new Promise((resolve, reject) => {
        if (tags && tags.length > 0) {
            try {

                tags.forEach(async (element, index, array) => {

                    let elIsNew = await isNewTag(element);
                    let elExist = await existTag(element);

                    if (elIsNew && !elExist) {
                        const created = await createTag(element);
                        tags[index] = created;
                    }
                    else if (elIsNew && elExist) {
                        const updated = await addTagRef(elExist._id);
                        tags[index] = updated;
                    }
                    else {
                        const updated = await addTagRef(element._id);
                        tags[index] = updated;
                    }
                    if (index === array.length - 1) {
                        if (returnDoc === true) {
                            obj.tags = tags;
                            resolve(obj);
                        } else {
                            resolve(tags);
                        }
                    }
                });
            } catch (error) {
                reject(error);
            }
        } else {
            if (returnDoc === true) {
                obj.tags = tags;
                resolve(obj);
            } else {
                resolve(tags);
            }
        }
    })
}

const registerActivity = (action, object, objModel, subject) => {
    const dateNow = Date.now();
    const ctrlDate = new Date(dateMinus(new Date(), 'minute', 20)).getTime();
    const finOne = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const finded = await Activity.findOne({ //query today up to tonight
                    object: object,
                    subject: subject,
                    action: action,
                    updated: {
                        $gte: ctrlDate,
                        $lt: dateNow
                    }
                })
                resolve(finded)
            } catch (error) {
                reject(error)
            }
        })
    }
    const createActivity = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const activity = new Activity({
                    action: action,
                    object: object,
                    objModel: objModel,
                    subject: subject,
                    created: dateNow,
                    updated: dateNow,
                    accessId: 1
                })
                const saved = await activity.save();
                resolve(saved);
            } catch (error) {
                reject(error)
            }
        })

    }
    const updateActivity = (activity) => {
        return new Promise(async (resolve, reject) => {
            try {
                activity.updated = dateNow;
                const saved = await activity.save();
                resolve(saved);
            } catch (error) {
                reject(error)
            }
        })
    }
    return new Promise(async (resolve, reject) => {
        finOne().then((res) => {
            if (res) {
                return updateActivity(res);
            } else {
                return createActivity();
            }
        }).then((res) => {
            console.log(res)
            resolve(res)
        }).catch((error) => {
            reject(error)
        })
    });
}

const coreLib = {
    tagStore: tagStore,
    authorStore: authorStore,
    authorImport: authorImport,
    registerActivity: registerActivity
};
module.exports = coreLib;