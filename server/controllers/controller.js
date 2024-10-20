const { setUser } = require("../jwt/jwt");
const blurb = require("../model/blurbs");
const chats = require("../model/chats");
const user = require("../model/users");
const { body, validationResult } = require('express-validator');
const nodemailer=require('nodemailer')

const testing = (req, res) => {
  res.send("hello");
};

//signup
const OTP = () => {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const sendOTPEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
      }
  });

  const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `OTP for Fusion-FLow`,
      html: `<p>The OTP for signing in to Fusion-Flow is ${otp}.</p><br><p>Do not share it with anyone.</p>`
  };

  return transporter.sendMail(mailOptions);
};

const checkUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
  }

  try {
      let users = await user.findOne({ email: req.body.email });
      if (users) {
          return res.status(400).json({ message: "The account with this email id already exists" });
      }

      let name = await user.findOne({ username: req.body.username });
      if (name) {
          return res.status(400).json({ message: "The username already exists. Choose a different username." });
      }

      const otp = OTP();
      await sendOTPEmail(req.body.email, otp);
      res.json({ success:true, 'otp': otp });
  } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Server error" });
  }
};

const signUpUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
  }

  try {
      let user1 = await user.findOne({ email: req.body.email });
      if (user1) {
          return res.status(400).json({ message: "The account with this email id already exists" });
      }

      let name = await user.findOne({ username: req.body.username });
      if (name) {
          return res.status(400).json({ message: "The username already exists. Choose a different username." });
      }

      const password = req.body.password;
      // const salt = await bcrypt.genSalt(10);
      // const secPass = await bcrypt.hash(password, salt);
      
      user1 = new user({
          username: req.body.username,
          email: req.body.email,
          password: password
      });


      let regUser = await user1.save();
      regUser= {
        _id : regUser._id,
        email: regUser.email,
        username: regUser.username
      }
      res.status(200).json({ signup: true, regUser })
  } catch (err) {
    console.log(err)
      return res.status(500).json({ message: "Sorry! Server error has been detected" });
  }
};
// const signup = async (req, res) => {
//   try {
//     const { username, email, password, confirmPassword } = req.body;

//     // Check if username already exists
//     const existingUsername = await user.findOne({ username });
//     if (existingUsername) {
//       return res
//         .status(400)
//         .json({ signup: false, msg: "Username already exists" });
//     }

//     // Check if email already exists
//     const existingEmail = await user.findOne({ email });
//     if (existingEmail) {
//       return res
//         .status(400)
//         .json({ signup: false, msg: "Email already exists" });
//     }

//     // Check if password matches confirm password
//     if (password !== confirmPassword) {
//       return res
//         .status(400)
//         .json({ signup: false, msg: "Passwords do not match" });
//     }

//     // Create new user
//     const newUser = await user.create({ username, email, password });
//     res.status(200).json({ signup: true, newUser });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: "Some error occurred" });
//   }
// };

//signin
const signin = async (req, res) => {
  // console.log(req.body);
  try {
    const { email, password } = req.body;
    const userDetails = await user.findOne({ email });
    if (!userDetails) {
      return res.status(400).json({ signin: false, msg: "User not exists" });
    } else {
      // console.log(userDetails);
      // if (password === userDetails.password) {
        const validUser = await userDetails.isPasswordCorrect(password)
        if(validUser){
        const token = setUser(userDetails.username,email)
        // console.log(token)

        res.cookie('fusionFLOW_Token', token, {
          httpOnly: true,
          secure: true,
          sameSite: 'None',
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      });
        const loggedInUser = {
         _id:userDetails._id,
         email: userDetails.email,
         username: userDetails.username
        }
        return res.status(200).json({ signin: true, loggedInUser,token });
      }
      else{
        return res.status(401).json({ signin: false, msg: "Incorrect email or password" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Some error occurred" });
  }
};

//get logged User Details
const getloggedUserDetails = async(req,res)=>{
  try {
    // console.log(req.userDetails)
    res.status(200).json(req.userDetails );
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "some error occurred" });
  }
}

//get all users
const getAllUsers = async(req,res)=>{
  try {
    let allUsers = await user.find({});
    allUsers = allUsers.filter((item)=>{
      return (item.username!=req.userDetails.username)
    })
    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    res.send(500).json({ msg: "some error occurred" });
  }
}

const postBlurb = async (req, res) => {
  try {
    const newBlurb = await blurb.create(req.body);
    res.status(200).json(newBlurb);
  } catch (error) {
    console.log(error);
    res.send(500).json({ msg: "some error occurred" });
  }
};

const getBlurbs = async (req, res) => {
  try {
    // console.log(req.userDetails);
    const allBlurb = await blurb.find({});
    res.status(200).json(allBlurb);
  } catch (error) {
    console.log(error);
    res.send(500).json({ msg: "some error occurred" });
  }
};


//patch chat
const patchChat = async (req, res) => {
  try {
    // findOneAndUpdate(filter,update data,options)
    const allChats = await chats.findOneAndUpdate(
      {user1:req.body.sender,user2:req.body.receiver},
      { $push: { messages: req.body } },//$push operator in MongoDB is used to add a specified value to an array field. If the array field does not exist, $push will create the field and add the value to the array.
      //This is the MongoDB update operator that adds an item to an array field. It takes an object where the keys are the names of the array fields you want to update and the values are the items you want to add to those arrays.
      { new: true, useFindAndModify: false }//Return the updated document, avoid deprecation warning.
    );
    
    if(!allChats){
      const allChats = await chats.findOneAndUpdate(
        {user1:req.body.receiver,user2:req.body.sender},
        { $push: { messages: req.body } },
        { new: true, useFindAndModify: false }
      );
    }
    res.status(200).json(allChats);
  } catch (error) {
    console.log(error);
    res.send(500).json({ msg: "some error occurred" });
  }
};

//get all chats
const getAllChats = async (req, res) => {
  try {
    // console.log(req.params);
    let allChats = await chats.findOne(req.params);
    if(!allChats){
      allChats = await chats.findOne({user1:req.params.user2,user2:req.params.user1});
    }
    if(allChats){
      return res.status(200).json(allChats);
    }
    else{
        const newConversation = await chats.create({...req.params,messages:[]});
        return res.status(200).json(newConversation);
    }
  } catch (error) {
    console.log(error);
    res.send(500).json({ msg: "some error occurred" });
  }
};

module.exports = {checkUser,signUpUser, testing, postBlurb, getBlurbs, signin ,getAllUsers,getloggedUserDetails,getAllChats,patchChat};