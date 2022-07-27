const mongoose = require('mongoose');
const vocabularySchema = mongoose.Schema({
    el: {
        type: String,
        required: true
    },
    la:{
        type: String,
        required: true
    },
    de: {
        type: String,
        required: true
    },
    en:{
        type: String,
        required: true
    },
    fr:{
        type: String,
        required: true
    },
    it:{
        type: String,
        required: true
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
    }
});

module.exports = mongoose.model('vocabulary', vocabularySchema);