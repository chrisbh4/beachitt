const express = require('express');
const asyncHandler = require('express-async-handler');
const { Favorites, RentalUnits, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

// Get all favorites for a user
router.get('/user/:userId', requireAuth, asyncHandler(async (req, res) => {
  const favorites = await Favorites.findAll({
    where: { userId: req.params.userId },
    include: [
      {
        model: RentalUnits,
        attributes: ['id', 'title', 'city', 'state', 'url', 'price', 'rooms', 'bathrooms', 'distanceFromBeach']
      }
    ],
    order: [['createdAt', 'DESC']]
  });
  
  res.json(favorites);
}));

// Add a favorite
router.post('/add', requireAuth, asyncHandler(async (req, res) => {
  const { userId, rentalUnitId } = req.body;
  
  // Check if favorite already exists
  const existingFavorite = await Favorites.findOne({
    where: { userId, rentalUnitId }
  });
  
  if (existingFavorite) {
    return res.status(400).json({ error: 'Unit is already in your favorites' });
  }
  
  const favorite = await Favorites.create({
    userId,
    rentalUnitId
  });
  
  // Fetch the favorite with included rental unit data
  const favoriteWithUnit = await Favorites.findByPk(favorite.id, {
    include: [
      {
        model: RentalUnits,
        attributes: ['id', 'title', 'city', 'state', 'url', 'price', 'rooms', 'bathrooms', 'distanceFromBeach']
      }
    ]
  });
  
  res.json({ favorite: favoriteWithUnit });
}));

// Remove a favorite
router.delete('/remove', requireAuth, asyncHandler(async (req, res) => {
  const { userId, rentalUnitId } = req.body;
  
  const favorite = await Favorites.findOne({
    where: { userId, rentalUnitId }
  });
  
  if (!favorite) {
    return res.status(404).json({ error: 'Favorite not found' });
  }
  
  await favorite.destroy();
  
  res.json({ message: 'Favorite removed successfully' });
}));

// Check if a unit is favorited by a user
router.get('/check/:userId/:rentalUnitId', requireAuth, asyncHandler(async (req, res) => {
  const { userId, rentalUnitId } = req.params;
  
  const favorite = await Favorites.findOne({
    where: { userId, rentalUnitId }
  });
  
  res.json({ isFavorited: !!favorite });
}));

module.exports = router; 