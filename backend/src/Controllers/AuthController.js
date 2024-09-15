const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (user) {
      return res
        .status(409) //for conflict
        .json({ msg: "user is already exists, you can login", sucess: false });
    }

    const userModel = new UserModel({
      name,
      email,
      password,
    });
    userModel.password = await bcrypt.hash(password, 10);
    const response = await userModel.save();

    return res.status(201).json({
      msg: "signup sucessful",
      sucess: true,
      data: response,
    });
  } catch (err) {
    console.log("errror in signup", err);
    return res.status(500).json({
      msg: "Internal Server error",
      sucess: false,
      error: err.message,
    });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    const errorMsg = "Auth failed, email or passord is wrong.";

    if (!user) {
      return res.status(409).json({ msg: errorMsg, sucess: false });
    }

    const isPassEqual = await bcrypt.compare(password, user.password);

    if (!isPassEqual) {
      return res.status(409).json({ msg: errorMsg, sucess: false });
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.jwt_secret,
      { expiresIn: "24h" }
    );

    return res.status(201).json({
      msg: "Login sucessful",
      sucess: true,
      token : jwtToken,
      email,
      name : user.name
    });
  } catch (err) {
    console.log("errror in signup", err);
    return res.status(500).json({
      msg: "Internal Server error",
      sucess: false,
      error: err.message,
    });
  }
};

module.exports = {
  signup,
  login
};
