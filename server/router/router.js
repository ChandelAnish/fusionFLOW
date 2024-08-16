const express = require("express");
const loggedInUserOnly = require("../middleware/auth");
const router = express.Router();
const {
  testing,
  postBlurb,
  getBlurbs,
  signup,
  signin,
} = require("../controllers/controller");

router.get("/", testing);

//sign up
router.route("/signup").post(signup);

//sign in
router.route("/signin").post(signin);

//post blurb
router.route("/blurb").post(loggedInUserOnly,postBlurb).get(loggedInUserOnly,getBlurbs);

module.exports = router;
