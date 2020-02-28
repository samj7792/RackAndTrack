const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route   GET api/auth
// @desc    Test
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    // Get the id from the user in the token
    const id = req.user.id;

    // Find the user with that id
    const user = await User.findById(id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth
// @desc    Login user
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please include an email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // if the errors var is not empty it will send a 400 status and an array of errors
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // See if a user with the email entered exists
      let user = await User.findOne({ email });

      // If a user does not exist with that email return an error
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // compare the entered password to the user's ecrypted password
      const isMatch = await bcrypt.compare(password, user.password);

      // If they do not match return an error
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          // user.id is the _id from the database
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        // expiresIn is optional, might remove later
        { expiresIn: 10800 },
        (err, token) => {
          // if there is an error, throw it
          if (err) throw err;
          // else return the token in json format
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
