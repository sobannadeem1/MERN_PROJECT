const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
  name: {
    required: true,
    trim: true,
    type: String,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const ContactSchema = new mongoose.model("Contact", contactSchema);
module.exports = ContactSchema;
