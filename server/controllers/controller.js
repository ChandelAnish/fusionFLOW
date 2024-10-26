const { setUser } = require("../jwt/jwt");
const blurb = require("../model/blurbs");
const chats = require("../model/chats");
const user = require("../model/users");
const { uploadOnCloudinary } = require("../utils/cloudinary.js");
const { ApiError } = require("../utils/ApiError.js");
const { asyncHandler } = require("../utils/asyncHandler.js");
const { ApiResponse } = require("../utils/ApiResponse.js");
const multer = require("multer");
const mongoose = require("mongoose");

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
        const token = setUser(userDetails.username, email, password);
        // console.log(token)

        res.cookie("fusionFLOW_Token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        return res.status(200).json({ signin: true, userDetails, token });
      } else {
        return res
          .status(401)
          .json({ signin: false, msg: "Incorrect email or password" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Some error occurred" });
  }
};

//get logged User Details
const getloggedUserDetails = async (req, res) => {
  try {
    // console.log(req.userDetails)
    res.status(200).json(req.userDetails);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "some error occurred" });
  }
};

//get all users
const getAllUsers = async (req, res) => {
  try {
    let allUsers = await user.find({});
    allUsers = allUsers.filter((item) => {
      return item.username != req.userDetails.username;
    });
    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    res.send(500).json({ msg: "some error occurred" });
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
      { user1: req.body.sender, user2: req.body.receiver },
      { $push: { messages: req.body } }, //$push operator in MongoDB is used to add a specified value to an array field. If the array field does not exist, $push will create the field and add the value to the array.
      //This is the MongoDB update operator that adds an item to an array field. It takes an object where the keys are the names of the array fields you want to update and the values are the items you want to add to those arrays.
      { new: true, useFindAndModify: false } //Return the updated document, avoid deprecation warning.
    );

    if (!allChats) {
      const allChats = await chats.findOneAndUpdate(
        { user1: req.body.receiver, user2: req.body.sender },
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
    if (!allChats) {
      allChats = await chats.findOne({
        user1: req.params.user2,
        user2: req.params.user1,
      });
    }
    if (allChats) {
      return res.status(200).json(allChats);
    } else {
      const newConversation = await chats.create({
        ...req.params,
        messages: [],
      });
      return res.status(200).json(newConversation);
    }
  } catch (error) {
    console.log(error);
    res.send(500).json({ msg: "some error occurred" });
  }
};

// add Profile Avatar
const uploadImage = asyncHandler(async (req, res) => {
  // try {

  // } catch (error) {
  //   console.log("hello");

  //   throw new ApiError(400, "Error: ", error);
  // }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  // let avatarLocalPath;
  // if (
  //   req.file &&
  //   Array.isArray(req.file.avatar) &&
  //   req.file.avatar.length > 0
  // ) {
  //   avatarLocalPath = req.file?.avatar[0]?.path;
  // }

  // used multer to get pic from machine and save it into public folder
  if (!avatarLocalPath) {
    throw new ApiError(400, "please upload a photo");
  }

  // using the image saved in public folder upload in cloudinary and generatea URL and store that in database
  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar.url) {
    throw new ApiError(400, "error in uploading image to cloudinary");
  }

  console.log("hello");
  
  const updatedUser = await user.findByIdAndUpdate(
    req.user?.id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    { new: true },
  );
  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "account updated successfully"));
});

// update user profile
const updateAvatar = asyncHandler(async (req, res) => {
  try {
    // fetching image from user using multer
    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
      throw new ApiError(400, "please upload the picture");
    }

    // uploading the image on cloudinary and creating URL for dataBase
    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar.url) {
      throw new ApiError(400, "could not upload image to cloudinary");
    }

    // deleteing old avatar picture from database
    const deletedAvatar = await user.findByIdAndUpdate(req.user?.id, {
      $unset: {
        avatar: 1,
      },
    });

    if (!deletedAvatar) {
      throw new ApiError(400, "error deleting old avatar picture");
    }

    // updating database
    const updatedAvatar = await user
      .findByIdAndUpdate(
        req.user?.id,
        {
          $set: {
            avatar: avatar.url,
          },
        },
        { new: true }
      )
      .select("-password");

    // .select("-password") this statment retuns updated info user without password field

    return res
      .status(200)
      .json(new ApiResponse(200, updatedAvatar, "avatar updated successfully"));
  } catch (error) {
    throw new ApiError(400, "Error for update avatar: ", error);
  }
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  try {
    //  requesting information from the body
    const { username, email } = req.body;

    if (!(username || email)) {
      throw new ApiError(401, "All fields are required");
    }

    // checking for existing username
    const existingUsername = await user.findOne({ username });
    if (existingUsername) {
      throw new ApiError(400, "username already exists");
    }

    // updating information
    const user = await user
      .findByIdAndUpdate(
        req.user?.id,
        {
          $set: {
            username: username,
            email: email,
          },
        },
        { new: true }
      )
      .select("-password");

    return res
      .status(200)
      .json(new ApiResponse(200, user, "Account details updated successfully"));
  } catch (error) {
    throw new ApiError(400, "Error in updatingInfo Section: ", error);
  }
});

module.exports = {
  testing,
  postBlurb,
  getBlurbs,
  signup,
  signin,
  getAllUsers,
  getloggedUserDetails,
  getAllChats,
  patchChat,
  uploadImage,
  updateAvatar,
  updateAccountDetails,
};
