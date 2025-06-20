const express = require('express');
const asyncHandler = require('express-async-handler');
const { RentalUnits, Reviews, Bookings } = require('../../db/models')
const { requireAuth, setTokenCookie } = require('../../utils/auth')
const {check} = require('express-validator');
const {handleValidationErrors} = require('../../utils/validation')
const { dataAdjuster} = require('../../utils/utils')
const { singleMulterUpload , singlePublicFileUpload} = require("../../awsS3")


const router = express.Router();
//* requireAuth: middleware that is used to make sure only logged in users can hit certain routes

const unitValidations = [
 check("title")
  .isLength({min:2})
  .withMessage("Must enter a title greater than 2 characters."),
 check("city")
  .isLength({min:2})
  .withMessage("Must enter a city name."),
 check("distanceFromBeach")
  .isFloat({min:0, max:5})
  .withMessage("Must enter a distance number between 0 and 5 miles"),
 check("lat")
  .isLength({min:4})
  .withMessage("Latitude must be longer than 4 digits"),
 check("lng")
 .isLength({min:4})
 .withMessage("Longitude longer than 4 digits"),
 check("pool")
  .notEmpty()
  .withMessage("Must select yes or no"),
 check("price")
 .isFloat({min:1})
 .withMessage("Must enter a price between: $150.00-$100,000.00"),
 check("rentalUnitDescription")
  .isLength({min:5})
  .withMessage("Description must be longer than 5 characters."),
 check("rooms")
  .isInt({min:1})
  .withMessage("Must enter an amount of rooms."),
 check("bathrooms")
  .isInt({min:1})
  .withMessage("Must enter an amount of bathrooms."),
 check("state")
 .isLength({min:2,max:2})
 .withMessage("Enter state initials."),
//  check("state")
//  .isString()
//  .withMessage("Must be letters Aa-zZ"),
 check("zipcode")
 .isInt()
 .withMessage("Must enter a valid zipcode."),
 check("unitType")
 .notEmpty()
 .withMessage("Must select a unit type."),
  handleValidationErrors
];



router.get('/', asyncHandler(async (_req, res) => {
  const allRentalUnits = await RentalUnits.findAll({include:[Reviews,Bookings]})
  const rentalUnits = await dataAdjuster(allRentalUnits)
  return res.json(rentalUnits)

}));


router.get('/:id', asyncHandler(async (req, res) => {
  const unit = await RentalUnits.findByPk(req.params.id,{include:[Reviews,Bookings]})
  res.json( unit )
}))



router.post('/new', singleMulterUpload("url"),unitValidations,  asyncHandler(async (req, res) => {
  let url;
  if(!req.file) url = "https://beachitt-app.s3.us-west-1.amazonaws.com/No-Image-Available.png";
  if(req.file)url = await singlePublicFileUpload(req.file);

  const { title, ownerId, city, distanceFromBeach, lat, lng,
    pool, price, rentalUnitDescription, bathrooms, unitType, rooms, state, zipcode } = req.body;

  const totalRentals = 0;

  const newUnit = await RentalUnits.create({
    title, ownerId, city, distanceFromBeach, lat, lng, pool, price,
    rentalUnitDescription, bathrooms, unitType, rooms, state, zipcode, totalRentals, url
  });

  return res.json( newUnit );

}))



router.put('/edit/:id', singleMulterUpload("url"),unitValidations, asyncHandler(async( req, res )=>{
  const unit = await RentalUnits.findByPk(req.params.id,{include:[Reviews,Bookings]});
  const file = req.file;

  if(file) unit.url = await singlePublicFileUpload(file);

      unit.title = req.body.title;
      unit.city = req.body.city;
      unit.distanceFromBeach = req.body.distanceFromBeach;
      unit.lat = req.body.lat;
      unit.lng = req.body.lng;
      unit.pool = req.body.pool;
      unit.price = req.body.price;
      unit.rentalUnitDescription = req.body.rentalUnitDescription;
      unit.bathrooms = req.body.bathrooms;
      unit.unitType = req.body.unitType;
      unit.rooms = req.body.rooms;
      unit.state = req.body.state;
      unit.zipcode = req.body.zipcode;

  await unit.save()
  return res.json(unit)

}))



router.delete('/edit/:id', requireAuth, asyncHandler(async (req, res) => {
  const rentalUnit = await RentalUnits.findByPk(req.params.id);

  //* Find a better way on querying for all the Reviews/Bookings that belong to the rentalUnit
  const unitReviews = await Reviews.findAll();
  const unitBookings = await Bookings.findAll();

  unitReviews.map((review) => {
    if (review.rentalUnitId === rentalUnit.id) {
        review.destroy()
    }
    return
  })

  unitBookings.map((booking) => {
    if (booking.rentalUnitId === rentalUnit.id) {
        booking.destroy()
    }
    return
  })

  if(!rentalUnit) new Error(' Cannot find Rental Unit ');

  await rentalUnit.destroy()
  return res.send("unit has been deleted")
}))

module.exports = router;
