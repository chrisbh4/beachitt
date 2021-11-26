const express = require('express');
const asyncHandler = require('express-async-handler');
const {Reviews} = require('../../db/models')
const {dataAdjuster} = require('../../utils/utils')

const router = express.Router();


router.get('/', asyncHandler( async ( req , res )=>{


    const data = await Reviews.findAll();
    const reviews = dataAdjuster(data);

    return res.json({reviews})

}))


router.get('/:id', asyncHandler( async ( req , res )=>{
    const review = await Reviews.findByPk(req.params.id);
    return res.json({review})
    // return res.json(review})
}))


router.post('/new', asyncHandler( async ( req , res )=>{
     const {comment, rentalUnitId, userId,username}= req.body;
     const review = await Reviews.create({comment,rentalUnitId,userId,username});

    return res.json({review})
}))

router.put('/:id', asyncHandler( async ( req , res )=>{

    const review = await Reviews.findByPk(req.params.id);
    const {comment}= req.body;

    review.comment = comment;
    await review.save();

    return res.json({review})
}))

router.delete('/:id', asyncHandler( async ( req , res )=>{

    const review = await Reviews.findByPk(req.params.id);
    await review.destroy();

    return res.send("review has been deleted")

}))

module.exports = router;
