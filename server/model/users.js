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
// hash password logic here
const bcrypt = require("bcrypt");
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};


module.exports = mongoose.model('user',userSchema)