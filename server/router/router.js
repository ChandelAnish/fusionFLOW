const express = require("express");
const loggedInUserOnly = require("../middleware/auth");
const router = express.Router();
const {
  testing,
  postBlurb,
  getBlurbs,
  signin,
  getAllUsers,
  getloggedUserDetails,
  patchChat,
  getAllChats,
  signUpUser,
  checkUser
} = require("../controllers/controller");

router.get("/", testing);

//sign up
router.route('/check').post(checkUser);
router.route("/signup").post(signUpUser);

//sign in
router.route("/signin").post(signin);

//get logged in user details
router.route("/loggedUserDetails").get(loggedInUserOnly,getloggedUserDetails);

//get all users
router.route("/users").get(loggedInUserOnly,getAllUsers);

//post blurb
router.route("/blurb").post(loggedInUserOnly,postBlurb).get(loggedInUserOnly,getBlurbs);

//save chats & get chat
router.route("/chats/:user1/:user2").get(loggedInUserOnly,getAllChats);
router.route("/chats").patch(loggedInUserOnly,patchChat);

module.exports = router;