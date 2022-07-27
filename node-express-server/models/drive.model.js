const mongoose = require('mongoose');
const driveSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    mimetype:{
        type: String,
        required: true,
    },
    size:{
        type:Number,
        required:false
    },
    path:{
        type: String,
        required:false
    },
    description: {
        type: String,
        required: false
    },
    relationschip:[{
        _id  :  {type: mongoose.Schema.Types.ObjectId},
        type  : {type:String},
        label : {type:String, required:false},
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
        default:"1"
    },
    enable: {
        type: Boolean,
        required: false,
        default: true,
    }
});

module.exports = mongoose.model('drive', driveSchema);