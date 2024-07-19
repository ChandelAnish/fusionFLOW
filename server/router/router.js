const express = require("express");
const router = express.Router();
const { testing, postBlurb, getBlurbs ,signup} = require("../controllers/controller");

router.get("/", testing);


//sign up
router.route("/signup").post(signup);


//post blurb
router.route("/blurb").post(postBlurb).get(getBlurbs);



module.exports = router;
