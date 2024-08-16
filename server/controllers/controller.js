const { setUser } = require("../jwt/jwt");
const blurb = require("../model/blurbs");
const user = require("../model/users");

const testing = (req, res) => {
  res.send("hello");
};

//signup
const signup = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // Check if username already exists
    const existingUsername = await user.findOne({ username });
    if (existingUsername) {
      return res
        .status(400)
        .json({ signup: false, msg: "Username already exists" });
    }

    // Check if email already exists
    const existingEmail = await user.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ signup: false, msg: "Email already exists" });
    }

    // Check if password matches confirm password
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ signup: false, msg: "Passwords do not match" });
    }

    // Create new user
    const newUser = await user.create({ username, email, password });
    res.status(200).json({ signup: true, newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Some error occurred" });
  }
};

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
      if (password === userDetails.password) {

        const token = setUser(userDetails.username,email,password)
        // console.log(token)

        res.cookie('fusionFLOW_Token', token, {
          httpOnly: true,
          secure: true,
          sameSite: 'None',
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      });

        return res.status(200).json({ signin: true, userDetails,token });
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
    console.log(req.userDetails);
    const allBlurb = await blurb.find({});
    res.status(200).json(allBlurb);
  } catch (error) {
    console.log(error);
    res.send(500).json({ msg: "some error occurred" });
  }
};

module.exports = { testing, postBlurb, getBlurbs, signup, signin };
