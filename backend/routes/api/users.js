const express = require('express');
const asyncHandler = require('express-async-handler');
// option 1
// const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();


// ! Going have to add fullname to the validateSignup array

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors,
  ];

const validateUserUpdate = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    handleValidationErrors,
  ];

const validatePasswordUpdate = [
    check('currentPassword')
      .exists({ checkFalsy: true })
      .withMessage('Current password is required.'),
    check('newPassword')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('New password must be 6 characters or more.'),
    handleValidationErrors,
  ];

// Sign up
router.post( '/',
 validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username,  } = req.body;
    const user = await User.signup({ email, username, password});

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

// Update user profile
router.put('/profile',
  requireAuth,
  validateUserUpdate,
  asyncHandler(async (req, res) => {
    const { username, email } = req.body;
    const userId = req.user.id;

    const user = await User.findByPk(userId);

    // Check if username or email already exists (excluding current user)
    const existingUser = await User.findOne({
      where: {
        [require('sequelize').Op.or]: [
          { username },
          { email }
        ],
        [require('sequelize').Op.not]: { id: userId }
      }
    });

    if (existingUser) {
      const err = new Error('User update failed');
      err.status = 400;
      err.title = 'User update failed';
      err.errors = ['Username or email already exists.'];
      return res.status(400).json(err);
    }

    user.username = username;
    user.email = email;
    await user.save();

    return res.json({
      user: user.toSafeObject()
    });
  }),
);

// Update password
router.put('/password',
  requireAuth,
  validatePasswordUpdate,
  asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    const user = await User.scope('loginUser').findByPk(userId);

    if (!user.validatePassword(currentPassword)) {
      const err = new Error('Password update failed');
      err.status = 400;
      err.title = 'Password update failed';
      err.errors = ['Current password is incorrect.'];
      return res.status(400).json(err);
    }

    const bcrypt = require('bcryptjs');
    user.hashedPassword = bcrypt.hashSync(newPassword);
    await user.save();

    return res.json({
      message: 'Password updated successfully'
    });
  }),
);

module.exports = router;
