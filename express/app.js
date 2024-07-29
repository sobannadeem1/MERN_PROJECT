const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const connect = require("./db/mongoose");
const model = require("./db/schema");
const router = require("./routes/auth-router");
const errmiddleware = require("./middlewares/error-middleware");

app.use(cors());
// Middleware to parse JSON
app.use(express.json());

// Use the router
app.use(router);
app.use(errmiddleware);

const port = process.env.PORT || 8000;

// Connect to the database
connect();

app.listen(port, () => {
  console.log(`App is running ${process.env.RUNNING} on port ${port}`);
});
