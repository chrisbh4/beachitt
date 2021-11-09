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


/*

* the issue is coming from the middle ware
* req.file =
 {
  fieldname: 'image',
  originalname: 'seed-2.png',
  encoding: '7bit',
  mimetype: 'image/png',
  buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 00 f0 00 00 00 f0 08 03 00 00 00 09 8b 19 a0 00 00 03 00 50 4c 54 45 00 00 00 c3 c3 c3 66 5f 58 ... 12551 more bytes>,
  size: 12601
}

*/
// router.post('/new', requireAuth, asyncHandler(async (req, res) => {
router.post('/new', singleMulterUpload('image'),  asyncHandler(async (req, res) => {
  console.log(req.file)
  debugger
  const { title, ownerId, city, distanceFromBeach, lat, lng,
    pool, price, rentalUnitDescription, bathrooms, unitType, rooms, state, zipcode } = req.body;

    const file  = {
      buffer:req.body.url
    }


    const awsResult = await singlePublicFileUpload(file)

    console.log(awsResult)

  // const file = req.file;
  const url = req.body.url;
  const totalRentals = 0;




  // * req.file is coming back undefined so that means the form/data conversion isn't happening either from the store or from the middleware
  // console.log(req.body.url);
  // console.log('--------------');
  // console.log(req.file);
  // console.log('--------------');

  debugger
  // const url = await singlePublicFileUpload(file)

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
