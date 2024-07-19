const mongoose = require('mongoose')

const blurbSchema = new mongoose.Schema({
    imageurl:{
        type:String,
        trim:true
    },
    title:{
        type:String,
        required:[true,"Blurb Title must be provided"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Blurb Description must be provided"],
        trim:true
    },
    postedAt:{
        type:Date,
        default:Date.now
    }
})


module.exports = mongoose.model('blurb',blurbSchema)