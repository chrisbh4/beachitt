const express = require('express');
const asyncHandler = require('express-async-handler');
// option 1
// const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { setTokenCookie} = require('../../utils/auth');
const { User, RentalUnits, Reviews, Bookings } = require('../../db/models');
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



// Sign up
router.post( '/',
 validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username,  } = req.body;
    const user = await User.signup({ email, username, password});
    // const user = await User.signup({ email, username, password, firstName, lastName, url});

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

//User Profile w/ data

router.get('/:id', asyncHandler(async (req, res )=>{
    const user = await User.findByPk(req.params.id,{include:[RentalUnits,Reviews,Bookings]})
    res.json(user)
    // return data
}))


module.exports = router;
