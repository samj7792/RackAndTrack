const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Workout = require('../../models/Workout');

// @route   POST api/workouts
// @desc    Add a workout
// @access  Private
router.get(
  '/',
  [
    auth,
    [
      check('title', 'Please enter the name of your workout')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    // Check for valid input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Using the given token, find the user info without the password
      const user = await User.findById(req.user.id).select('-password');

      const newWorkout = new Workout({
        title: req.body.title,
        description: req.body.description,
        name: user.name,
        user: req.user.id
      });

      const workout = await newWorkout.save();

      res.json(workout);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
