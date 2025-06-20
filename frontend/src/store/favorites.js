import { csrfFetch } from "./csrf";

const LOAD_FAVORITES = 'favorites/LOAD';
const ADD_FAVORITE = 'favorites/ADD';
const REMOVE_FAVORITE = 'favorites/REMOVE';
const CHECK_FAVORITE = 'favorites/CHECK';

const loadFavorites = (favorites) => ({
  type: LOAD_FAVORITES,
  favorites
});

const addFavorite = (favorite) => ({
  type: ADD_FAVORITE,
  favorite
});

const removeFavorite = (rentalUnitId) => ({
  type: REMOVE_FAVORITE,
  rentalUnitId
});

const checkFavorite = (rentalUnitId, isFavorited) => ({
  type: CHECK_FAVORITE,
  rentalUnitId,
  isFavorited
});

// Get all favorites for a user
export const fetchUserFavorites = (userId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/favorites/user/${userId}`);
    const data = await response.json();
    
    if (response.ok) {
      dispatch(loadFavorites(data));
    } else {
      console.error('Favorites API error:', data);
    }
    return data;
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return { error: error.message };
  }
};

// Add a favorite
export const addToFavorites = (userId, rentalUnitId) => async (dispatch) => {
  const response = await csrfFetch('/api/favorites/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, rentalUnitId }),
  });
  
  const data = await response.json();
  
  if (response.ok) {
    dispatch(addFavorite(data.favorite));
  }
  
  return data;
};

// Remove a favorite
export const removeFromFavorites = (userId, rentalUnitId) => async (dispatch) => {
  const response = await csrfFetch('/api/favorites/remove', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, rentalUnitId }),
  });
  
  const data = await response.json();
  
  if (response.ok) {
    dispatch(removeFavorite(rentalUnitId));
  }
  
  return data;
};

// Check if a unit is favorited
export const checkIfFavorited = (userId, rentalUnitId) => async (dispatch) => {
  const response = await csrfFetch(`/api/favorites/check/${userId}/${rentalUnitId}`);
  const data = await response.json();
  
  if (response.ok) {
    dispatch(checkFavorite(rentalUnitId, data.isFavorited));
  }
  
  return data;
};

const initialState = {};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_FAVORITES: {
      const newState = {};
      action.favorites.forEach(favorite => {
        newState[favorite.rentalUnitId] = favorite;
      });
      return newState;
    }
    case ADD_FAVORITE: {
      const newState = { ...state };
      // Store by rentalUnitId for consistency
      newState[action.favorite.rentalUnitId] = action.favorite;
      return newState;
    }
    case REMOVE_FAVORITE: {
      const newState = { ...state };
      delete newState[action.rentalUnitId];
      return newState;
    }
    case CHECK_FAVORITE: {
      // This action is mainly for tracking favorite status
      // The actual favorite data is managed by other actions
      return state;
    }
    default:
      return state;
  }
};

export default favoritesReducer; 