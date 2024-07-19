const blurb = require("../model/model");

const testing = (req, res) => {
  res.send("hello");
};

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
    const allBlurb = await blurb.find({});
    res.status(200).json(allBlurb);
  } catch (error) {
    console.log(error);
    res.send(500).json({ msg: "some error occurred" });
  }
};



module.exports = { testing, postBlurb ,getBlurbs};