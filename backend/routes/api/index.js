const router = require('express').Router();

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const rentalUnitsRouter = require('./rentalUnits')
const mapsRouter = require('./maps')
const bookingsRouter = require('./bookings')

const rentalReview = require('./reviews')

router.use('/session', sessionRouter);
router.use('/bookings', bookingsRouter)
router.use('/units', rentalUnitsRouter);
router.use('/reviews', rentalReview);
router.use('/maps', mapsRouter)
router.use('/users', usersRouter);




//! Testers can delete if I want too could be used for an example later
// router.post('/test', function( req, res ){
//     res.json({requestBody : req.body})
// })


// GET /api/set-token-cookie
// const asyncHandler = require('express-async-handler');
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', asyncHandler(async (req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'Demo-lition'
//       },
//     })
//   setTokenCookie(res, user);
//   return res.json({ user });
// }));

// // GET /api/restore-user
// const { restoreUser } = require('../../utils/auth.js');
// router.get(
//   '/restore-user',
//   restoreUser,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );


// // GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );


module.exports = router ;
