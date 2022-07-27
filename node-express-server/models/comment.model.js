const mongoose = require('mongoose');
const commentSchema = mongoose.Schema({
    text: {
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
    },
    relObject:{
        type: mongoose.Schema.Types.ObjectId,
        refPath: "relType",
        required: true,
    },
    relType:{
        type:String,
        enum: ["comment", "book", "page", "bookmark", "activity"]
    }
});

module.exports = mongoose.model('comment', commentSchema);