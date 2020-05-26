const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  favWorkout: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
  },
  heightFt: {
    type: Number,
  },
  heightIn: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
