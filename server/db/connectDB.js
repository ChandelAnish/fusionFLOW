const mongoose = require('mongoose')
const url=process.env.MONGO_URL;
const connectDB = ()=>{
    return mongoose.connect(url)
}

module.exports = connectDB;