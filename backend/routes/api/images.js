const express = require('express');
const asyncHandler = require('express-async-handler');
// const router = require('.');
const {Images} = require('../../db/models');
// const RentalUnits = require('../../db/models');


const router = express.Router();

/*

* have unit form be a two step process
- first step would be unit info and press save but the save button would be a post after validations have passed
- second step would be image upload , there would be a third button for submission but it would just be a redirect button if all validations have passed and errors.length === 0



* Left Off on :
    - route is not posting could be caused from poorly build db or its missing a piece in the api route

*/

router.get('/', asyncHandler(async( req, res )=>{
    res.send("Image route")
}))





router.post('/new', asyncHandler( async(req, res)=>{
    const {url, rentalUnitId} = req.body;
    const newImage = await Images.create({rentalUnitId,url});
    return res.json({newImage});

}))


// router.get('/:id', asyncHandler(async( req, res )=>{
//     const rentalUnit = RentalUnits.findByPk(req.params.id,{
//         include:[Images]
//     })

// }))


module.exports = router;
