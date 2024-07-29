const mongoose = require("mongoose");
const bcrypyt = require("bcrypt");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    next();
  }

  try {
    const userpassword = await bcrypyt.hash(user.password, 12);
    user.password = userpassword;
  } catch (err) {
    next(err);
  }
});

const Model = mongoose.model("user", userSchema);
module.exports = Model;
