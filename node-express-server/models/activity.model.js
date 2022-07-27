const mongoose = require('mongoose');
const activitySchema = mongoose.Schema({
    action:{
        type: String,
        required: true,
        enum: ['created', 'updated', 'deleted', 'commented']
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer",
        required: true
    },
    object:{
        type: mongoose.Schema.Types.ObjectId,
        refPath: "objModel",
        required: true
    },
    objModel:{
        type: String,
        required: true
    },
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'comment',
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

module.exports = mongoose.model('activity', activitySchema);