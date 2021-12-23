const express = require('express');
const asyncHandler = require('express-async-handler');
const { RentalUnits, Reviews, Bookings } = require('../../db/models')
const { requireAuth, setTokenCookie } = require('../../utils/auth')
const {check} = require('express-validator');
const {handleValidationErrors} = require('../../utils/validation')
// import { csrfProtection } from '../../utils/utils';
const { dataAdjuster} = require('../../utils/utils')
// const newUnitValidation = require('../../utils/validation')
const { singleMulterUpload , singlePublicFileUpload} = require("../../awsS3")


const router = express.Router();
//* requireAuth: middleware that is used to make sure only logged in users can hit certain routes

const newUnitValidator = [
 check("title")
  .notEmpty()
  .isString()
  .withMessage("Must enter a title."),
 check("city")
  .notEmpty()
  .withMessage("Must enter a city name."),
 check("distanceFromBeach")
  .notEmpty()
  .isInt()
  .withMessage("Must enter a number"),
 check("lat")
  .notEmpty()
  .isInt()
  .withMessage("Must enter a number"),
 check("lng")
   .notEmpty()
  .isInt()
  .withMessage("Must enter a number"),
 check("pool")
  .notEmpty()
  .withMessage("Must select yes or no"),
 check("price")
 .isFloat({min:1})
 .withMessage("Must enter a price between: $150.00-$100,000.00"),
 check("rentalUnitDescription")
  .notEmpty(),
 check("rooms")
  .notEmpty(),
  .withMessage("Must enter an amount of rooms."),
 check("state")
 .isLength({min:2,max:2})
.withMessage("Enter state initials."),
 check("zipcode")
 .notEmpty()
 .isInt()
 .withMessage("Must enter a zipcode."),
  handleValidationErrors
];



router.get('/', asyncHandler(async (_req, res) => {
  const allRentalUnits = await RentalUnits.findAll({include:[Reviews,Bookings]})
  // const allRentalUnits = await RentalUnits.findAll({include:[{Reviews}, {Bookings}]})
  const rentalUnits = dataAdjuster(allRentalUnits)
  return res.json(rentalUnits)

}));


router.get('/:id', asyncHandler(async (req, res) => {
  const unit = await RentalUnits.findByPk(req.params.id,{include:[Reviews,Bookings]})
  res.json( unit )
}))



//! router.post('/new', requireAuth, asyncHandler(async (req, res) => {
router.post('/new', singleMulterUpload("url"),  asyncHandler(async (req, res) => {

  const { title, ownerId, city, distanceFromBeach, lat, lng,
    pool, price, rentalUnitDescription, bathrooms, unitType, rooms, state, zipcode } = req.body;

    const url = await singlePublicFileUpload(req.file)
    const totalRentals = 0;

  const newUnit = await RentalUnits.create({
    title, ownerId, city, distanceFromBeach, lat, lng, pool, price,
    rentalUnitDescription, bathrooms, unitType, rooms, state, zipcode, totalRentals, url
  });

  return res.json({ newUnit });

}))

router.put('/edit/:id', singleMulterUpload("url"), asyncHandler(async( req, res )=>{
  const unit = await RentalUnits.findByPk(req.params.id);

  const file = req.file;
  //console.log(req.file);

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
  return res.json({unit})

}))



router.delete('/edit/:id', requireAuth, asyncHandler(async (req, res) => {
  const rentalUnit = await RentalUnits.findByPk(req.params.id);

  if (!rentalUnit) new Error(' Cannot find Rental Unit ');

  await rentalUnit.destroy()
  return res.send("unit has been deleted")
}))

module.exports = router;
