const express = require('express');
const asyncHandler = require('express-async-handler');
const RentalUnits = require('../../db/models/')
const router= express.Router();



router.get('/units' , asyncHandler(( _req , res )=>{
    const allRentalUnits = await RentalUnits.findAll()
      return res.json(allRentalUnits)
}));


module.exports = router;
