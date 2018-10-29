// keys_prod.js - for Heroku
module.exports = {
  mongoURI: process.env.MONGO_URI,
  secretOrPrivateKey: process.env.SECRET_OR_KEY
};
