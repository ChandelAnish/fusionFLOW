const { getUser } = require("../jwt/jwt");

const loggedInUserOnly = (req, res, next) => {
  try {
    const token = req.cookies.fusionFLOW_Token;
    if (!token) {
        res.status(498).json({ signin: false, msg: "no token found" });
        return;
    }
    // console.log(token);
    const userDetails = getUser(token);
    // console.log(userDetails);
    req.userDetails=userDetails;// Attached decoded token data to req object
    next();
  } catch (error) {
    console.log("error in middleware");
  }
};

module.exports = loggedInUserOnly;
