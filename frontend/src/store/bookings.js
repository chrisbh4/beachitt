import {csrfFetch} from "./csrf";

const ADD_BOOKING = 'booking/ADD_BOOKING';
const DELETE_BOOKING= 'booking/DELETE_BOOKING';
const EDIT_BOOKING= 'booking/EDIT_BOOKING';


//! Ask why This file throws a dipsatch not defined but in /store/reviews I'm not importing a dispatch but it still works?


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


export const fetchAddBooking = async(payload) =>{
    const res = await csrfFetch('/api/bookings/new',{
        method:"POST",
        body:JSON.stringify(payload),
        headers:{"Content-Type":"application/JSON"}
    })

    const data = await res.json();
    if(data.ok) dispatch(addBooking(data))
    return data
};


export const fetchEditBooking = async(payload, bookingId) =>{
    const res = await csrfFetch(`/api/bookings/${bookingId}`,{
        method:"PUT",
        body:JSON.stringify(payload),
        headers:{"Content-Type":"application/JSON"}
    })

    const data = await res.json();

    if(data.ok) dispatch(editBooking(data))
    return data
};


export const fetchDeleteBooking = async (bookingId)=>{
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
