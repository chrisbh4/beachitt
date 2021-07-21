const express = require('express');
const asyncHandler = require('express-async-handler');
const {RentalUnits} = require('../../db/models')
const {requireAuth} = require('../../utils/auth')
const router= express.Router();

//* requireAuth: middleware that is used to make sure only logged in users can hit certain routes


router.get('/' , asyncHandler(async( _req , res )=>{
    const allRentalUnits = await RentalUnits.findAll()
      return res.json(allRentalUnits)
}));


// router.post('/', requireAuth , asyncHandler ( async ( req ,res )=>{

// }))


module.exports = router;
