const express = require('express');
const asyncHandler = require('express-async-handler');
const {Images} = require('../../db/models')
const { requireAuth, setTokenCookie } = require('../../utils/auth')
// import { csrfProtection } from '../../utils/utils';
// const newUnitValidation = require('../../utils/validation')


const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const allImages = await Images.findAll()

    return res.json(allImages)
}))


router.post('/', asyncHandler(async (req, res) => {
    const { rentalUnitId, url} = req.body

    const newImage = await Images.create({
        rentalUnitId , url
    })

    return res.json({newImage})
}))

// router.delete('/:id', asyncHandler(async(req,res)=>{
//         grabs image by its id from the url
//     const image = await Images.findByPk(req.params.id)

//         grabs image by its rentalUnitId from the url
//     const image = await Images.findAll({
//     where:{
//       rentalUnitId:req.params.id
//     }
//   })
//   console.log('This is the Image ID:   ',image)
//     // recieving an empty array []
//     if (!image) new Error(' Cannot find Image you are selecting to delete ');

//     await image.destroy()
//     return

// }))



// router.get('/:id', asyncHandler(async (req, res) => {
    // const image = await Images.findByPk(req.params.id)
    // res.json(image)


        // grabs image by its rentalUnitId number
//     const image = await Images.findAll({
//       where:{
//         rentalUnitId:req.params.id
//       }
//     })
//     console.log('This is the Image ID:   ',image)

//     res.json( image )


//   }))

/*
grabs the image with matching unit.id of images.rentalUnitId
 const image = await Images.findAll({
    where:{
      rentalUnitId:req.params.id
    }
  })

  res.json( image )
*/

module.exports = router;
