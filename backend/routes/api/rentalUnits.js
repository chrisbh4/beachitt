const express = require('express');
const asyncHandler = require('express-async-handler');
const { RentalUnits, Images} = require('../../db/models')
const { requireAuth, setTokenCookie } = require('../../utils/auth')
// import { csrfProtection } from '../../utils/utils';
// const newUnitValidation = require('../../utils/validation')
const { singleMulterUpload , singlePublicFileUpload} = require("../../awsS3")


const router = express.Router();
//* requireAuth: middleware that is used to make sure only logged in users can hit certain routes


router.get('/', asyncHandler(async (_req, res) => {
  // const allRentalUnits = await RentalUnits.findAll({include:[Images]})
  const allRentalUnits = await RentalUnits.findAll()
  return res.json(allRentalUnits)
}));


router.get('/:id', asyncHandler(async (req, res) => {
  const unit = await RentalUnits.findByPk(req.params.id)
  res.json( unit )

}))

router.post('/new', requireAuth, asyncHandler(async (req, res) => {
  const { title, ownerId, city, distanceFromBeach, lat, lng,
    pool, price, rentalUnitDescription, bathrooms, unitType, rooms, state, zipcode, totalRentals, url } = req.body

  const newUnit = await RentalUnits.create({
    title, ownerId, city, distanceFromBeach, lat, lng, pool, price,
    rentalUnitDescription, bathrooms, unitType, rooms, state, zipcode, totalRentals, url
  });

  return res.json({ newUnit });
}))

router.put('/edit/:id', requireAuth, asyncHandler(async( req, res )=>{
  const unit = await RentalUnits.findByPk(req.params.id);

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
      unit.url = req.body.url;

  await unit.save()
  return res.json({unit})

}))



router.delete('/edit/:id', requireAuth, asyncHandler(async (req, res) => {
  const rentalUnit = await RentalUnits.findByPk(req.params.id);

  if (!rentalUnit) new Error(' Cannot find Rental Unit ');

  await rentalUnit.destroy()
  return
}))

module.exports = router;
