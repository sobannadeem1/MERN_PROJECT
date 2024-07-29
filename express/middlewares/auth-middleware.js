const jwt = require("jsonwebtoken");
const user = require("../db/schema");

const authmiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    res.status(400).json({ msg: "token not provided" });
  }
  const token = authHeader.replace("Bearer ", "").trim();
  if (!token) {
    res.status(401).json({ msg: "Not trimming" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userdata = await user
      .findOne({ email: decoded.email })
      .select({ password: 0 });

    console.log(decoded);
    s;
    req.user = userdata;
    req.token = token;
    req.id = decoded._id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authmiddleware;
