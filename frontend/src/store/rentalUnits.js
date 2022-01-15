import { csrfFetch } from "./csrf"

const LOAD = 'units/LOAD';
const LOAD_ONE = 'units/LOAD_ONE';
const ADD = 'units/ADD';
const DELETE = 'units/DELETE';
const DELETE_REVIEW = 'units/DELETE_REVIEW';
const EDIT = 'units/EDIT';

const load = units => ({
  type: LOAD,
  units,
});


const loadOne = unit => ({
  type: LOAD_ONE,
  unit,
});

const addUnit = unit => ({
  type: ADD,
  unit,
});

const deleteUnit = (unitId) => ({
  type: DELETE,
  unitId,
})

const deleteUnitReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId,
})

const editUnit = (unit) => ({
  type: EDIT,
  unit,
})





//* grabs all units
export const getRentalUnits = () => async dispatch => {
  const res = await csrfFetch(`/api/units`);
  const data = await res.json();
  dispatch(load(data))
};

export const getSingleUnit = (unitId) => async dispatch => {
  const res = await csrfFetch(`/api/units/${unitId}`);
  const data = await res.json();
  if (res.ok) dispatch(loadOne(data))
  return data
}


export const createRentalUnit = (payload) => async dispatch => {
  const formData = new FormData();
  const { title, ownerId, city, state, zipcode, distanceFromBeach, rooms, bathrooms, pool, unitType, lat, lng, price, rentalUnitDescription, totalRental, url } = payload
  formData.append("title", title)
  formData.append("ownerId", ownerId)
  formData.append("city", city)
  formData.append("state", state)
  formData.append("zipcode", zipcode)
  formData.append("distanceFromBeach", distanceFromBeach)
  formData.append("rooms", rooms)
  formData.append("bathrooms", bathrooms)
  formData.append("pool", pool)
  formData.append("unitType", unitType)
  formData.append("lat", lat)
  formData.append("lng", lng)
  formData.append("price", price)
  formData.append("rentalUnitDescription", rentalUnitDescription)
  formData.append("totalRentals", totalRental)

  if (url) formData.append("url", url);

  const res = await csrfFetch(`/api/units/new`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });

  const data = await res.json();

  console.log(data)
  if (res.ok) dispatch(addUnit(data))

  return data
}


export const editRentalUnit = (payload, unitId) => async dispatch => {
  const formData = new FormData();
  const { title, city, state, zipcode, distanceFromBeach, rooms, bathrooms, pool, unitType, lat, lng, price, rentalUnitDescription, url } = payload;
  formData.append("title", title)
  formData.append("city", city)
  formData.append("state", state)
  formData.append("zipcode", zipcode)
  formData.append("distanceFromBeach", distanceFromBeach)
  formData.append("rooms", rooms)
  formData.append("bathrooms", bathrooms)
  formData.append("pool", pool)
  formData.append("unitType", unitType)
  formData.append("lat", lat)
  formData.append("lng", lng)
  formData.append("price", price)
  formData.append("rentalUnitDescription", rentalUnitDescription)

  if (url) formData.append("url", url);

  const res = await csrfFetch(`/api/units/edit/${unitId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });

  const data = await res.json();
  if (res.ok) dispatch(editUnit(data))

  return data
}


export const deleteRentalUnit = (unitId) => async dispatch => {
  const res = await csrfFetch(`/api/units/edit/${unitId}`, {
    method: "DELETE"
  });

  const data = await res.json();

  if (res.ok) dispatch(deleteUnit(data))
  return data
}



export const fetchDeleteReview = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE"
  });

  const data = await res.json();

  if (res.ok) dispatch(deleteUnitReview(data))
  return data
}

/*

* Need to understand how my ADD thunk has two objects instead of just one
  1. Need to fix the POST api route return from
  2. Grab the fetched response properly after its been jsonifyed
  3. Key into the action correctly

*/



const initialState = {};

const rentalUnitReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD: {
      return { ...action.units }
    }
    case LOAD_ONE: {
      return { ...action.unit }
    }
    case ADD: {
      const newState = { ...state }
      newState[action.unit.id] = action.unit;
      // newState[action.unit.newUnit.id] = action.unit.newUnit;
      return { ...newState }
    }
    case DELETE: {
      const newState = { ...state };
      delete newState[action.unitId]
      return { ...newState }
    }
    // iterating to check to find the correct review
    case DELETE_REVIEW: {
      const newState = { ...state };
      // delete newState.Reviews[action.reviewsId]
      newState.Reviews.forEach((review) => {
        if (review.id === action.reviewId) {
          delete newState.Reviews.review.id
        };
      })
      return { ...newState }
    }
    case EDIT: {
      const newState = { ...state }
      newState[action.unit.id] = action.unit
      // return {...newState}
      return { ...action.unit }
      // return{
      //   ...state,...action.unit
      // }
    }
    default:
      return state;
  }
}


export default rentalUnitReducer
