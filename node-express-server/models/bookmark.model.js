const mongoose = require('mongoose');

const bookmarkSchema = mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    description: {
        type: String,
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
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'comment',
        required:false
    }]
});


module.exports = mongoose.model('bookmark', bookmarkSchema);