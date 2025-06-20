const express = require('express');
const asyncHandler = require('express-async-handler');
// const { dataAdjuster} = require('../../utils/utils');
const {check} = require('express-validator')
const {Bookings, RentalUnits, User} = require('../../db/models')
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

// Get bookings for a specific user
router.get('/user/:userId', asyncHandler(async( req, res)=>{
    const bookings = await Bookings.findAll({
        where: { userId: req.params.userId },
        include: [
            {
                model: RentalUnits,
                attributes: ['id', 'title', 'city', 'state', 'url', 'price']
            },
            {
                model: User,
                as: 'User',
                attributes: ['id', 'username', 'email']
            }
        ],
        attributes: ['id', 'userId', 'startDate', 'endDate', 'rentalUnitId', 'pricePerNight', 'totalPrice', 'numberOfNights'],
        order: [['startDate', 'DESC']]
    });
    
    if(bookings) {
        res.json(bookings);
    } else {
        res.json([]);
    }
}));

router.get('/:id', asyncHandler(async( req, res)=>{
    const booking = await Bookings.findByPk(req.params.id)
    if(booking) res.json(booking);
    // res.end()
     return booking

}));

router.post('/new', asyncHandler( async ( req, res )=>{
    const { userId , startDate , endDate , rentalUnitId } = req.body;
    
    // Calculate the number of nights
    const start = new Date(startDate);
    const end = new Date(endDate);
    const numberOfNights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    
    // Get the rental unit to get the current price and owner ID
    const rentalUnit = await RentalUnits.findByPk(rentalUnitId);
    if (!rentalUnit) {
        return res.status(404).json({ error: 'Rental unit not found' });
    }
    
    // Check if the user is the owner of the unit
    const isOwner = userId === rentalUnit.ownerId;
    
    // Set pricing based on ownership
    const pricePerNight = isOwner ? 0 : parseFloat(rentalUnit.price);
    const totalPrice = pricePerNight * numberOfNights;
    
    const booking = await Bookings.create({
        userId, 
        startDate, 
        endDate, 
        rentalUnitId,
        pricePerNight,
        totalPrice,
        numberOfNights
    });

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
