const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Again, we don't actually use events - expect this to change into Car

const EventSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Event = mongoose.model('event', EventSchema);
