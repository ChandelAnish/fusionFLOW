const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        trim: true,
        required: true
    },
    receiver: {
        type: String,
        trim: true,
        required: true
    },
    msg: {
        type: String,
        trim: true,
        required: true
    },
    time: {
        type: String,
        // default: Date.now
    }
});

const chatsSchema = new mongoose.Schema({
    user1:{
        type:String,
        trim:true
    },
    user2:{
        type:String,
        trim:true
    },
    postedAt:{
        type:Date,
        default:Date.now
    },
    messages:[messageSchema]
})


module.exports = mongoose.model('chat',chatsSchema)