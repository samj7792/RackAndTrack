const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

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

module.exports = router;
