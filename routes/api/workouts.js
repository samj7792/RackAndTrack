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
router.post(
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

// @route   GET api/workouts
// @desc    Get all workouts
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const workouts = await Workout.find();

    res.json(workouts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/workouts/liked
// @desc    Get all workouts liked by user
// @access  Private
router.get('/liked', auth, async (req, res) => {
  try {
    const workouts = await Workout.find();

    console.log(workouts);

    const likedWorkouts = workouts.filter(workout => workout.likes.length);

    console.log(likedWorkouts);

    const likedByMe = likedWorkouts.filter(workout => {
      return workout.likes.filter(like => like.user.toString() === req.user.id);
    });

    console.log(likedByMe);

    if (likedByMe.length === 0) {
      return res.status(404).json({ msg: 'No liked workouts found' });
    }

    res.json(likedByMe);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/workouts/:id
// @desc    Get workout by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    // Check if workout exists
    if (!workout) {
      return res.status(404).json({ msg: 'Workout not found' });
    }

    res.json(workout);
  } catch (err) {
    console.error(err.message);
    // This conditional to prevent server error message if ID does not match length of typical ID
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Workout not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/workouts/:id
// @desc    Delete workout by id
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    // Check if workout exists
    if (!workout) {
      return res.status(404).json({ msg: 'Workout not found' });
    }

    // Check if user who created workout is deleting
    if (workout.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await workout.remove();

    res.json({ msg: 'Workout removed' });
  } catch (err) {
    console.error(err.message);
    // This conditional to prevent server error message if ID does not match length of typical ID
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Workout not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/workouts/like/:id
// @desc    Like / Unlike a workout
// @access  Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    // Check if workout exists
    if (!workout) {
      return res.status(404).json({ msg: 'Workout not found' });
    }

    // Check if it has already been liked
    if (
      workout.likes.filter(like => like.user.toString() === req.user.id)
        .length > 0
    ) {
      // If it has been liked by the user, unlike it
      workout.likes = workout.likes.filter(
        like => like.user.toString() !== req.user.id
      );
    } else {
      workout.likes.unshift({ user: req.user.id });
    }

    await workout.save();

    res.json(workout.likes);
  } catch (err) {
    console.error(err.message);
    // This conditional to prevent server error if ID does not match length of typical ID
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
