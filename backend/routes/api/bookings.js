const express = require('express');
const asyncHandler = require('express-async-handler');
// const { dataAdjuster} = require('../../utils/utils');
const {check} = require('express-validator')
const {Bookings} = require('../../db/models')
const {handleValidationErrors} = require("../../utils/validation")

const router = express.Router();

const validateBooking = [
    check("startDate")
        .exists({checkFalsy: true})
        .withMessage('Please select a start date'),
    check("endDate")
        .exists({checkFalsy: true})
        .withMessage('Please select an end date'),
    handleValidationErrors
];

router.get('/', asyncHandler(async( req, res)=>{
    const booking = await Bookings.findAll()
    if(booking) res.json(booking);

   return res.json({msg:"No bookings available."})
}));


router.get('/:id', asyncHandler(async( req, res)=>{
    const booking = await Bookings.findByPk(req.params.id)
    if(booking) res.json(booking);
    // res.end()
     return booking

}));

router.post('/new', asyncHandler( async ( req, res )=>{
    const { userId , startDate , endDate , rentalUnitId } = req.body;
    const booking =  await Bookings.create({userId, startDate, endDate ,rentalUnitId});

    res.json({booking});
}))


router.put('/:id', asyncHandler( async(req ,res) =>{
    const booking = await Bookings.findByPk(req.params.id);

    booking.startDate = req.body.startDate;
    booking.endDate = req.body.endDate;
    await booking.save()

    res.json(booking)
}))


router.delete('/:id', asyncHandler( async (req ,res) =>{
    const booking = await Bookings.findByPk(req.params.id);
    await booking.destroy();

    res.json({msg:"Booking has been removed"})
}))




module.exports = router;
