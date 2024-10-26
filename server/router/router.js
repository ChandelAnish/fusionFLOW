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

// Basic Testing Route
router.get("/", testing);

// User Routes
router.route("/check").post(checkUser);       // Check User Availability
router.route("/signup").post(signUpUser);     // Sign Up User
router.route("/signin").post(signin);         // Sign In User
router.route("/loggedUserDetails")            // Get Logged-In User Details
  .get(loggedInUserOnly, getloggedUserDetails);
router.route("/users")                        // Get All Users
  .get(loggedInUserOnly, getAllUsers);

// Blurb Routes
router.route("/blurb")                        // Post or Get Blurbs
  .post(loggedInUserOnly, postBlurb)
  .get(loggedInUserOnly, getBlurbs);

// Chat Routes
router.route("/chats/:user1/:user2")          // Get Chats Between Two Users
  .get(loggedInUserOnly, getAllChats);
router.route("/chats")                        // Save Chat
  .patch(loggedInUserOnly, patchChat);

module.exports = router;
