const { validationResult } = require('express-validator');
const {check} = require('express-validator');
// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)

const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => `${error.msg}`);

    const err = Error('Bad request.');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request.';
    next(err);
  }
  next();
};

const id = check('id')
  .notEmpty()
  .isInt({ min: 0 });
const title= check('title')
  .notEmpty()
const city= check('city')
  .notEmpty()
const distanceFromBeach= check('distanceFromBeach')
  .notEmpty()
const lat= check('lat')
  .notEmpty()
const lng= check('lng')
  .notEmpty()
const pool= check('pool')
  .notEmpty()
const price= check('price')
  .notEmpty()
const rentalUnitDescription= check('rentalUnitDescription')
  .notEmpty()
const rooms= check('rooms')
  .notEmpty()
const state= check('state')
  .notEmpty()
const zipcode= check('zipcode')
  .notEmpty()


exports.validateCreate = [
  title,
  city,
  distanceFromBeach,
  lat,
  lng,
  pool,
  price,
  rentalUnitDescription,
  rooms,
  state,
  zipcode,
  handleValidationErrors,
];

exports.validateUpdate = [
  id,
  title,
  city,
  distanceFromBeach,
  lat,
  lng,
  pool,
  price,
  rentalUnitDescription,
  rooms,
  state,
  zipcode,
  handleValidationErrors,
];


module.exports = {

  handleValidationErrors,
};
