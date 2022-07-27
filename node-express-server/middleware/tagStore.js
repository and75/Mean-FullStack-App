
const fs = require('fs');
const path = require('path');
const Tag = require('../models/tag.model');


tagFormatter = (req, res, next) => {
    const tags = req.body.translations? req.body.translations : req.body.tags;
    if(tags && tags.length>0){
        let returnVal = [];
        const promisess = tags.map((el)=>{
            const dateNow = Date.now(); 
            const find = Tag.find({'label':el}).exec((err, doc)=>{
                console.log('find',doc);
                if(doc.length){
                    return find;
                }
            });
            
        })

        console.log('promise:', promisess)
       
        req.tags = returnVal;
        next();
    }
}

const tagStore = {
    tagFormatter: tagFormatter,
};
module.exports = tagStore;