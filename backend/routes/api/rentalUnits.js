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


router.post('/new' , asyncHandler( async ( req ,res )=>{
  const {title, ownerId ,  city,  distanceFromBeach, lat, lng,
    pool, price , rentalUnitDescription, bathrooms, unitType , rooms, state, zipcode,totalRentals } = req.body

    const newUnit = await RentalUnits.create({title,ownerId,  city,  distanceFromBeach, lat, lng,  pool, price ,
      rentalUnitDescription, bathrooms , unitType , rooms , state, zipcode , totalRentals})

    // await setTokenCookie(res , newUnit )

    return res.json({newUnit
    })
  }))


module.exports = router;
