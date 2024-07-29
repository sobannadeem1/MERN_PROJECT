const express = require("express");
const router = express.Router();
const {
  home,
  register,
  login,
  user,
} = require("../controllers/auth-controller");
const authmiddleware = require("../middlewares/auth-middleware");
const validate = require("../middlewares/validate");
const { signupSchema, loginSchema } = require("../validate/auth-validator"); // Import correctly
const { contact } = require("../controllers/contactcont");

router.get("/", home);
router.post("/register", validate(signupSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/contact", contact);
router.route("/user").get(authmiddleware, user);

module.exports = router;
