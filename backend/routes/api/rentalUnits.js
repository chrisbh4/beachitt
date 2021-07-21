const express = require('express');
const asyncHandler = require('express-async-handler');
const {RentalUnits} = require('../../db/models')
const {requireAuth} = require('../../utils/auth')
const router= express.Router();



router.get('/' ,requireAuth, asyncHandler(async( _req , res )=>{
    const allRentalUnits = await RentalUnits.findAll()
      return res.json(allRentalUnits)
}));


module.exports = router;
