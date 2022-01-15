import { csrfFetch } from "./csrf";

const LOAD = 'reviews/LOAD';
const ADD_REVIEW = 'reviews/ADD';
const DELETE = 'reviews/DELETE';
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
  type: DELETE,
  review
})


export const getReview = (id) => async dispatch => {
  const res = await csrfFetch(`/api/reviews/${id}`);
  const data = await res.json();
  if (data) dispatch(load(data.review));

  return data.review
};


/*
  - New Reviews are not being spread into the Unit.Reviews instead only being placed in the State.reviews obj
    - Find a way to access the Unit's reviews so it can update
    - Find a way to have the Unit refresh it's data so its up to date
      * maybe use a setState inside a useEffect to be able to check but idk how that would grab new data from the url with only usuing react tools)

*/


export const createReview = (payload) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  });

  const data = await res.json()
  if (res.ok) dispatch(addReviewState(data))

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
  if (res.ok) dispatch(editReviewState(data));

  return data
}



export const deleteReview = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE"
  });

  const data = await res.json();

  if (res.ok) dispatch(deleteReviewState(data))
  return data
}

/*
 key into the current state of Units ( state.rentalUnit.Reviews[action.review.id]=action.review)
  Would have to build the createReview thunk inside the /store/units since it's state is what is being updated

  Reviews never updates the Unit's state after a review has been deleted
  The state also does not update even when calling for the newlyFetched Data, maybe because I'm not awaiting the dispatch

*/

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REVIEW: {

      // return {[action.review.id]:action.review };
      return {...action.review}
    }
    case LOAD: {
      return { ...state, ...action.reviews };
    }
    case DELETE: {
      // const newState = { ...state.rentalUnit.Reviews };
      const newState = { ...state };
      delete newState[action.unitId];
      return { ...newState }
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
