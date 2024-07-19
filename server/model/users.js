const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        required:[true,"Blurb Title must be provided"],
        trim:true
    },
    password:{
        type:String,
        required:[true,"Blurb Description must be provided"],
        trim:true
    }
})


module.exports = mongoose.model('user',userSchema)