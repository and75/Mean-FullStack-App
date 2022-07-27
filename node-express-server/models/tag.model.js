const mongoose = require('mongoose');
const tagSchema = mongoose.Schema({
    label: {
        type: String,
        unique: true,
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
    translations:[{
        type: String,
        required: false
    }],
    translationsIds:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "tag",
        required: false
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer",
        required: false
    }
});

module.exports = mongoose.model('tag', tagSchema);