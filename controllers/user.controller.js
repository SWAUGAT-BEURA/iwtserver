const User = require("../models/userModel");
const bcryt = require("bcryptjs");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const secretKey = "meanstack2021";

exports.register = async (req, res) => {
  const userSchema = joi.object({
    fullname: joi.string().required().min(4),
    email: joi.string().required(),
    phone: joi.string().required().max(10),
    course: joi.string().required(),
    college: joi.string().required(),
    password: joi.string().required().min(6).max(16),
  });

  try {
    let userfields = await userSchema.validateAsync(req.body);
    let user = await User.findOne({ email: userfields.email });
    if (!user) {
      user = new User(userfields);
      const salt = await bcryt.genSalt(10);
      user.password = await bcryt.hash(user.password, salt);
      await user.save();
      res.status(200).json({
        message: "user registered successfully",
        userData: user,
      });
    } else {
      res.status(400).json({
        message: "user already eists with the email id",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Something Went Wrong",
      error: err,
    });
  }
};

exports.login = async (req, res) => {
  const loginSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required(),
  });

  try {
    const loginfields = await loginSchema.validateAsync(req.body);
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(401).json({
        message: "Username/password doesn't exists",
      });
    } else {
      const is_match = await bcryt.compare(loginfields.password, user.password);
      if (!is_match) {
        res.status(401).json({
          message: "Username/password doesn't exists",
        });
      } else {
        const payload = {
          userdata: {
            id: user._id,
          },
        };
        const token = await jwt.sign(payload, secretKey, { expiresIn: 7200 });
        res.status(200).json({
          message: "logged in",
          user: { id: user._id, name: user.fullname },
          token,
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      message: "something went wrong",
      error: err,
    });
  }
};

exports.getstudents = (req, res) => {
  User.find({})
    .then((user) => {
      if (user) {
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 200;
        res.json(user);
      } else {
        res.json({
          msg: "No blogs found",
        });
      }
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.userInfo = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.userInfoUpdate = async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can update only your account!");
  }
};

exports.userDelete = async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
};
