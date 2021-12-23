import { csrfFetch } from "./csrf";

const LOAD = 'reviews/LOAD';
const ADD_REVIEW = 'reviews/ADD';
const DELETE_REVIEW = 'reviews/DELETE';
const EDIT_REVIEW = 'reviews/EDIT';



const load = reviews => ({
  type: LOAD,
  reviews
});

const addReviewState = review => ({
  type: ADD_REVIEW,
  review
});

const editReviewState = review => ({
  type: EDIT_REVIEW,
  review
})

const deleteReviewState = review => ({
  type: DELETE_REVIEW,
  review
})


export const getReview = (id) => async dispatch => {
  const res = await csrfFetch(`/api/reviews/${id}`);
  const data = await res.json();
  if (data) dispatch(load(data.review));

  return data.review
};




export const createReview = (payload) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  });

  const data = await res.json()
  if (data.ok) dispatch(addReviewState(data))

  return data
};


export const editReview = (payload, reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  if (data.ok) dispatch(editReviewState(data));

  return data
}



export const deleteReview = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE"
  });

  const data = await res.json();

  if (data.ok) dispatch(deleteReviewState(data))
  return data
}


const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REVIEW: {
      return { ...state, [action.review.id]: action.review };
    }
    case LOAD: {
      return { ...state, ...action.reviews };
    }
    case DELETE_REVIEW: {
      const newState = { ...state };
      delete newState[action.unitId];
      return { newState }
    }
    case EDIT_REVIEW: {
      const newState = { ...state };
      newState[action.review.id] = action.review;
      return { ...newState }

    }
    default:
      return state;
  }
};


export default reviewsReducer;
