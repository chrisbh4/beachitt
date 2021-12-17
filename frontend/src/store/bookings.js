import {csrfFetch} from "./csrf";

const LOAD_BOOKING = 'booking/LOAD_BOOKING';
const ADD_BOOKING = 'booking/ADD_BOOKING';
const DELETE_BOOKING= 'booking/DELETE_BOOKING';
const EDIT_BOOKING= 'booking/EDIT_BOOKING';



const loadBooking = bookingId =>({
    type:LOAD_BOOKING,
    bookingId,
})

  const addBooking = booking => ({
    type: ADD_BOOKING,
    booking,
  });


  const deleteBooking = (bookingId)=>({
    type: DELETE_BOOKING,
    bookingId,
  })

  const editBooking = (bookingId)=>({
    type:EDIT_BOOKING,
    bookingId,
  })


  export const fetchBooking = (bookingId) => async dispatch => {
    const res = await csrfFetch(`/api/bookings/${bookingId}`);
    const data = await res.json();

    if (data) dispatch(loadBooking(data))
    return data

  };


export const fetchAddBooking = (payload)=> async(dispatch) =>{
    const res = await csrfFetch('/api/bookings/new',{
        method:"POST",
        body:JSON.stringify(payload),
        headers:{"Content-Type":"application/JSON"}
    })

    const data = await res.json();
    if(data.ok) dispatch(addBooking(data))
    return data
};


export const fetchEditBooking =(payload, bookingId)=> async (dispatch) =>{
    const res = await csrfFetch(`/api/bookings/${bookingId}`,{
        method:"PUT",
        body:JSON.stringify(payload),
        headers:{"Content-Type":"application/JSON"}
    })

    const data = await res.json();

    if(data.ok) dispatch(editBooking(data))
    return data
};


export const fetchDeleteBooking = (bookingId) => async(dispatch) =>{
    const res = await csrfFetch(`/api/bookings/${bookingId}`,{
        method:"DELETE"
    })

    const data = await res.json();

    if(data.ok) dispatch(deleteBooking(data));
    return data
};


const initialState = {};

const bookingsReducer = (state = initialState , action) => {
    switch(action.type){
        case LOAD_BOOKING:{
            return {...state, ...action.booking}
        }
        case ADD_BOOKING:{
            return {...state, [action.booking.id]:action.booking};
        }
        case EDIT_BOOKING:{
            const newState = {...state};
            newState[action.bookng.id] = action.booking;
            return newState;
        }
        case DELETE_BOOKING:{
            const newState = {...state};
            delete newState[action.booking.id];
            return newState
        }
        default:
            return state;
    }
};



  export default bookingsReducer
