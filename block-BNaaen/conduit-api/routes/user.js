var express = require('express');
var jwt = require('jsonwebtoken');
const User = require('../models/User');
const Profile = require('../models/Profile');
const auth = require('../middlewares/auth');
var router = express.Router();

/* GET  user data. */
router.get('/', auth.isLoggedIn, async function (req, res, next) {
  let token = req.headers.authorization;

  let profileData = await jwt.verify(token, process.env.SECRET);

  try {
    let user = await User.findOne({ username: profileData.username }).populate(
      'profile'
    );
    if (!user) {
      return res.status(400).json({ error: 'Invalid token' });
    }
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

//update user data

router.put('/', auth.isLoggedIn, async (req, res, next) => {
  let data = req.body.user;
  console.log(data);

  try {
    let updatedUser = await User.findOneAndUpdate(
      {
        username: req.user.username,
      },
      data
    );
    let updatedProfile = await Profile.findOneAndUpdate(
      {
        username: req.user.username,
      },
      data
    );

    res.json({ user: updatedUser });
  } catch (error) {
    next(error);
  }
});

module.exports = router;