const Model = require("../db/schema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const home = async (req, res) => {
  try {
    res.status(200).send("home page");
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const checking = await Model.findOne({ email });

    if (checking) {
      return res.status(400).json({ message: "user already exists" });
    }

    const newUser = new Model({
      name,
      username,
      email,
      password,
    });
    await newUser.save();

    // Generate token after saving the user
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.SECRET_KEY,
      { expiresIn: "30d" }
    );

    console.log("Generated Token:", token);

    // Send only one response with the user data and token
    res.status(200).json({ message: "new user created", user: newUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const finding = await Model.findOne({ email });

    if (!finding) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    const userfind = await bcrypt.compare(password, finding.password);
    if (userfind) {
      const token1 = jwt.sign(
        { id: finding._id, email: finding.email },
        process.env.SECRET_KEY,
        { expiresIn: "30d" }
      );

      return res.status(200).json({
        message: "login successful",
        token: token1,
        userId: finding._id,
      });
    } else {
      return res
        .status(400)
        .json({ message: "password and email do not match" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const user = async (req, res) => {
  try {
    const userdata = req.user;
    console.log(userdata);
    res.status(200).json({ message: userdata });
  } catch (error) {
    console.log(`error from user ${error}`);
  }
};

module.exports = { home, register, login, user };
