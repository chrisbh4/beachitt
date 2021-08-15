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

module.exports = router;
