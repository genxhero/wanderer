const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const app = express();
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const vehicles = require("./routes/api/vehicles");
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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}
app.get('/', (req, res) => res.send("Welcome to Wayfarer's temp page"));
app.use("/api/users", users);
app.use("/api/vehicles", vehicles)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

