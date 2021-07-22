const express = require('express');
const asyncHandler = require('express-async-handler');
const {RentalUnits} = require('../../db/models')
const {requireAuth , setTokenCookie} = require('../../utils/auth')
// import { csrfProtection } from '../../utils/utils';
// const newUnitValidation = require('../../utils/validation')


const router= express.Router();
//* requireAuth: middleware that is used to make sure only logged in users can hit certain routes


router.get('/' , asyncHandler(async( _req , res )=>{
    const allRentalUnits = await RentalUnits.findAll()
      return res.json(allRentalUnits)
}));


router.post('/new', requireAuth , asyncHandler( async ( req ,res )=>{
  const {title,  city,  distanceFromBeach, lat, lng,
    pool, price , rentalUnitDescription, rooms, state, zipcode, } = req.body

    const newUnit = await RentalUnits.create({title,  city,  distanceFromBeach, lat, lng,  pool, price ,
      rentalUnitDescription, rooms, state, zipcode})

    await setTokenCookie(res , newUnit )

    return res.json({newUnit
    })
  }))


module.exports = router;
