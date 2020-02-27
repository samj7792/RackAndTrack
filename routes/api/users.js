const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register users
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid, unique email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // if the errors var is not empty it will send a 400 status and an array of errors
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // See if a user with the email entered already exists
      let user = await User.findOne({ email });

      // If a user exists with that email return an error
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User with that email already exists' }] });
      }

      // create an instance of the new user
      user = new User({ name, email, password });

      // Encrypting the password using bcrypt
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      // Save the user to the database
      await user.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }

    res.send('User route...');
  }
);

module.exports = router;
