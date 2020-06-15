const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Exercise = require('../../models/Exercise');

// @route   POST api/exercises
// @desc    Add a exercise
// @access  Private
router.post(
  '/',
  [
    auth,
    [check('title', 'Please enter the name of your exercise').not().isEmpty()],
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

      const newExercise = new Exercise({
        title: req.body.title,
        description: req.body.description,
        name: user.name,
        user: req.user.id,
      });

      const exercise = await newExercise.save();

      res.json(exercise);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/exercises
// @desc    Get all exercises
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const exercises = await Exercise.find();

    res.json(exercises);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/exercises/liked
// @desc    Get all exercises liked by user
// @access  Private
router.get('/liked', auth, async (req, res) => {
  try {
    const exercises = await Exercise.find({ 'likes.user': req.user.id });

    if (exercises.length === 0) {
      return res.status(404).json({ msg: 'No liked exercises found' });
    }

    res.json(exercises);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/exercises/mine
// @desc    Get all exercises created by user
// @access  Private
router.get('/mine', auth, async (req, res) => {
  try {
    const exercises = await Exercise.find({ user: req.user.id });
    res.json(exercises);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/exercises/prevsets/:id
// @desc    Get user's sets for a exercise
// @access  Private
router.get('/prevsets/:id', auth, async (req, res) => {
  try {
    const exercise = await Exercise.find({
      $and: [{ _id: req.params.id }, { 'sets.user': req.user.id }],
    });

    // Check if exercise exists
    if (exercise.length === 0) {
      return res.status(404).send({ msg: 'No previous sets found' });
    }

    const title = exercise[0].title;

    const sets = exercise[0].sets.filter(
      (set) => set.user.toString() === req.user.id
    );

    res.json({ title, sets });
  } catch (err) {
    console.error(err.message);
    // This conditional to prevent server error message if ID does not match length of typical ID
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Exercise not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/exercises/set/:id
// @desc    Add a set to a exercise
// @access  Private
router.post(
  '/set/:id',
  [
    auth,
    [
      check('weight', 'Weight is required').not().isEmpty(),
      check('reps', 'Number of reps is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const exercise = await Exercise.findById(req.params.id);

      // Check if exercise exists
      if (!exercise) {
        return res.status(404).json({ msg: 'Exercise not found' });
      }

      // Create set object
      const set = {
        user: req.user.id,
        weight: req.body.weight,
        reps: req.body.reps,
      };

      // Add set to front of array
      exercise.sets.unshift(set);

      await exercise.save();

      res.json(exercise);
    } catch (err) {
      console.error(err.message);
      // This conditional to prevent server error message if ID does not match length of typical ID
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Exercise not found' });
      }
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/exercises/:id
// @desc    Get exercise by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);

    // Check if exercise exists
    if (!exercise) {
      return res.status(404).json({ msg: 'Exercise not found' });
    }

    res.json(exercise);
  } catch (err) {
    console.error(err.message);
    // This conditional to prevent server error message if ID does not match length of typical ID
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Exercise not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/exercises/:id
// @desc    Delete exercise by id
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);

    // Check if exercise exists
    if (!exercise) {
      return res.status(404).json({ msg: 'Exercise not found' });
    }

    // Check if user who created exercise is deleting
    if (exercise.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await exercise.remove();

    res.json({ msg: 'Exercise removed' });
  } catch (err) {
    console.error(err.message);
    // This conditional to prevent server error message if ID does not match length of typical ID
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Exercise not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/exercises/like/:id
// @desc    Like / Unlike a exercise
// @access  Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);

    // Check if exercise exists
    if (!exercise) {
      return res.status(404).json({ msg: 'Exercise not found' });
    }

    // Check if it has already been liked
    if (
      exercise.likes.filter((like) => like.user.toString() === req.user.id)
        .length > 0
    ) {
      // If it has been liked by the user, unlike it
      exercise.likes = exercise.likes.filter(
        (like) => like.user.toString() !== req.user.id
      );
    } else {
      exercise.likes.unshift({ user: req.user.id });
    }

    await exercise.save();

    res.json(exercise.likes);
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
