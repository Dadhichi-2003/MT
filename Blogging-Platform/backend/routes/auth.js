const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //validation
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All Field Must Be Required",
      });
    }

    //check user already exist or not
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(409).json({
        success: false,
        message: "User Already Exist. Try With Another Email",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    if (user) {
      res.status(200).json({
        success: true,
        message: "Register Successfully",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Can't Register. Try Again Letter!",
    });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please Provide Email or Password",
      });
    }

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({
        success: false,
        message: "Email is not registered",
      });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });

    // Generate token with an expiration time of 1 hour
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login Succeessfully",
      token,
      userId: user._id,
    });
  } catch (err) {
    res.status(500).json({
      message: "Can't Login. Try Again Letter!",
    });
  }
});

module.exports = router;
