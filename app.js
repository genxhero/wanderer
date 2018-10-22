const express = require("express");
const mongoose = require("mongoose");
const app = express();
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const events = require("./routes/api/events");
const bodyParser = require("body-parser");
const passport = require("passport");
require('./config/passport');


mongoose
  .connect(db)
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

  // Please place app.use(bodyParsers) before any routes

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());

app.get('/', (req, res) => res.send("Welcome to Wayfarer's temp page"));
app.use("/api/users", users);
app.use("/api/events", events);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

