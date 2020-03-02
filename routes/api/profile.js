const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Profile = require('../../models/Profile');

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    // Create profile variable by finding a profile by the user's id and populate with their name from the User model
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name']);

    // Check if there is no profile
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.send(500).send('Server Error');
  }
});

module.exports = router;
