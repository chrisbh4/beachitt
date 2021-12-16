const express = require('express');
const asyncHandler = require('express-async-handler');
const { dataAdjuster} = require('../../utils/utils');
const {Bookings} = require('../../db/models')

const router = express.Router();

router.get('/:id', asyncHandler(async( req, res)=>{
    const booking = await Bookings.findByPk(req.params.id)
    if(booking) res.json({booking});
    

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
    res.json({booking})

}))


router.delete('/:id', asyncHandler( async (req ,res) =>{
    const booking = await Bookings.findByPk(req.params.id);
    await booking.destroy();
    res.json({msg:"Booking has been removed"})

}))

//! Need to change dating formats to ( yr-month-day )



module.exports = router;