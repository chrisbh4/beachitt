const express = require('express');
const asyncHandler = require('express-async-handler');
const {Reviews} = require('../../db/models');
const {dataAdjuster} = require('../../utils/utils');
const {handleValidationErrors} = require('../../utils/validation');
const {check} = require("express-validator");

const router = express.Router();

const reviewValiation =[
    check("comment")
    .isLength({min:5,max:100})
    .withMessage("Review must be bettwen 5-100 characters."),
    handleValidationErrors
]

router.get('/', asyncHandler( async ( req , res )=>{
    const data = await Reviews.findAll();
    const reviews = dataAdjuster(data);

    return res.json({reviews})


}))


router.get('/:id', asyncHandler( async ( req , res )=>{
    const review = await Reviews.findByPk(req.params.id);
    return res.json({review})
}))


router.post('/new',reviewValiation, asyncHandler( async ( req , res )=>{
     const {comment, rentalUnitId, userId,username}= req.body;
     const review = await Reviews.create({comment,rentalUnitId,userId,username});

    // return res.json({review})
    return res.json(review)
}))

router.put('/:id', reviewValiation, asyncHandler( async ( req , res )=>{

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
