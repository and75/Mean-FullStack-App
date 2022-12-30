const mongoose = require('mongoose');
const dateSchema = mongoose.Schema({
    century : {
        type:String,
        required : true,
        default:'---' 
    },
    bC: {
        type:Boolean,
        required:false,
        default:false,        
    },
    year : {
        type: String,
        required:true,
        default:'----'
    },
    place: {
        type:String,
        required:true,
        default:'----'
    }
});
const authorSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    biography: {
        type: String,
        required: false
    },
    birthDate : dateSchema,
    deathDate:  dateSchema,
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "book",
        required: false
    }],
    tags:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'tags',
        required:false
    }],
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
    }
});
module.exports = mongoose.model('author', authorSchema);