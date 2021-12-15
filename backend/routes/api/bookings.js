const express = require('express');
const asyncHandler = require('express-async-handler');
const { dataAdjuster} = require('../../utils/utils');
const {Bookings} = require('../../db/models')

const router = express.Router();

router.get('/:id', asyncHandler(async( req, res)=>{
    const booking = await Bookings.findByPk(req.params.id)

    res.json({booking})

}))
