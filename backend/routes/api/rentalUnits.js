const express = require('express');
const asyncHandler = require('express-async-handler');
const { RentalUnits , Images} = require('../../db/models')
const { requireAuth, setTokenCookie } = require('../../utils/auth')
// import { csrfProtection } from '../../utils/utils';
// const newUnitValidation = require('../../utils/validation')


const router = express.Router();
//* requireAuth: middleware that is used to make sure only logged in users can hit certain routes

/*
  [x] You need to reference the the correct relationship for rentalunit and images rentaUnitId
  [x] in the /get route I have to include Images because it will grab all the images
     that have the same ID to the RetanlUnit being dispalyed
  [x] even with the /:id route all the images will be pulled along as as well
        ex :
          const rentalUnit = await RentalUnits.findByPk(req.params.id, {
          include: [Image, Review, User]
  [] with the images /post route just need to make it link from the rentalUnit.id to the rentalUnitId row
*/


router.get('/', asyncHandler(async (_req, res) => {
  const allRentalUnits = await RentalUnits.findAll({
    include: [Images]
  })
  // console.log(allRentalUnits.Images)
  return res.json(allRentalUnits)
  //  const allImages = await Images.findAll()
  // Need to fix the frontend/store to be able to render the images
  // Postman works grabbing both allRentalUnits and allImages
  // return res.json({allRentalUnits:allRentalUnits, allImages:allImages})
}));


router.get('/:id', asyncHandler(async (req, res) => {
  const unit = await RentalUnits.findByPk(req.params.id,{
    include:[Images]
  })
  console.log(unit.Images)
  res.json( unit )

}))

router.post('/new', requireAuth, asyncHandler(async (req, res) => {
  const { title, ownerId, city, distanceFromBeach, lat, lng,
    pool, price, rentalUnitDescription, bathrooms, unitType, rooms, state, zipcode, totalRentals } = req.body

  const newUnit = await RentalUnits.create({
    title, ownerId, city, distanceFromBeach, lat, lng, pool, price,
    rentalUnitDescription, bathrooms, unitType, rooms, state, zipcode, totalRentals
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
