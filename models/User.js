const mongoose = require("mongoose");
const schema = mongoose.Schema;
const vehicleSchema = require('./Vehicle');

// creates the user model - this might be updated with car data, but I suspect that will need to be a different model

const UserSchema = new schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  vehicles: [{ type: schema.Types.ObjectId, ref: 'Vehicle' }]
  
})

module.exports = User = mongoose.model('user', UserSchema);