const mongoose = require('mongoose');
const tagStore = require('./../lib/core.lib');
const { update } = require('./customer.model');
const digitalSourceSchema = mongoose.Schema({
    label:{
        type:String,
        required:false
    },
    url:{
        type:String,
        required:false
    }
})
const editionSchema = mongoose.Schema({
    century : {
        type: String,
        required:false,
    },
    bC: {
        type:Boolean,
        required:false,
        default:false
    },
    year : {
        type:String,
        required:false,
    },
    location : {
        type:String,
        required:false
    } 
});
const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: false
    },
    authors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "author",
        required: true
    }],
    pages:{
        type:Number,
        required:true
    },
    lang : {
        type:String,
        required:false,
    },
    abstract: {
        type: String,
        required: false
    },
    firstEdition: editionSchema,
    currentEdition: editionSchema,
    reference : {
        type: String,
        required: false,
    },
    notes: {
        type: String,
        required: false,
    },
    source: {
        type: String,
        required: false,
    },
    digitalSource:digitalSourceSchema,
    isPrimary: {
        type: Boolean,
        required: false,
        default: false,
    },    
    pdf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "drive",
        required: false
    },
    created: {
        type: String,
        required: false
    },
    updated: {
        type: String,
        required: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer",
        required: false
    },
    accessId : {
        type:Number,
        required:true,
        default:"2"
    },
    enable: {
        type: Boolean,
        required: false,
        default: true,
    },
    protectedByC: {
        type:Boolean,
        required:false,
        default:true
    },
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'comment',
        required:false
    }],
    tags:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'tags',
        required:false
    }]
});
bookSchema.post('save', async function (doc, next) {
    
});
module.exports = mongoose.model('book', bookSchema);