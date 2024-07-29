const ContactSchema = require("../db/contact-schema");

const contact = async (req, res) => {
  const { name, email, message } = req.body;
  const newcontact = new ContactSchema({
    name,
    email,
    message,
  });
  const created = await newcontact.save();
  res.status(200).json({ message: "contact created", created });
};
module.exports = { contact };
