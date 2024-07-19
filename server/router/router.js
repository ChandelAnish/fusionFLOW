const express = require("express");
const router = express.Router();
const { testing, postBlurb, getBlurbs } = require("../controllers/controller");

router.get("/", testing);

//post blurb
router.route("/blurb").post(postBlurb).get(getBlurbs);

module.exports = router;
