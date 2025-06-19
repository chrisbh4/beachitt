import {csrfFetch} from "./csrf";

const LOAD_BOOKING = 'booking/LOAD_BOOKING';
const LOAD_USER_BOOKINGS = 'booking/LOAD_USER_BOOKINGS';
const ADD_BOOKING = 'booking/ADD_BOOKING';
const DELETE_BOOKING= 'booking/DELETE_BOOKING';
const EDIT_BOOKING= 'booking/EDIT_BOOKING';


const loadBooking = booking =>({
    type: LOAD_BOOKING,
    booking,
});

const loadUserBookings = bookings =>({
    type: LOAD_USER_BOOKINGS,
    bookings,
});

  const addBooking = booking => ({
    type: ADD_BOOKING,
    booking,
  });


  const deleteBooking = (bookingId)=>({
    type: DELETE_BOOKING,
    bookingId,
  })

  const editBooking = (booking)=>({
    type:EDIT_BOOKING,
    booking,
  })


  export const fetchBooking = (bookingId) => async (dispatch) => {
    const res = await csrfFetch(`/api/bookings/${bookingId}`);
    const data = await res.json();

    if(res.ok) dispatch(loadBooking(data))
    // return data.booking
    return data

  };

export const fetchUserBookings = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/bookings/user/${userId}`);
    const data = await res.json();

    if(res.ok) dispatch(loadUserBookings(data))
    return data
};

export const fetchAddBooking = (payload)=> async(dispatch) =>{
    const res = await csrfFetch('/api/bookings/new',{
        method:"POST",
        body:JSON.stringify(payload),
        headers:{"Content-Type":"application/JSON"}
    })

    const data = await res.json();
    if(res.ok) dispatch(addBooking(data))

    return data
};


export const fetchEditBooking =(payload, bookingId)=> async (dispatch) =>{
    const res = await csrfFetch(`/api/bookings/${bookingId}`,{
        method:"PUT",
        body:JSON.stringify(payload),
        headers:{"Content-Type":"application/JSON"}
    })

    const data = await res.json();
    if(res.ok) dispatch(editBooking(data))

    return data

};


export const fetchDeleteBooking = (bookingId) => async(dispatch) =>{
    const res = await csrfFetch(`/api/bookings/${bookingId}`,{
        method:"DELETE"
    })

    const data = await res.json();
    if(res.ok) dispatch(deleteBooking(data));

    return data
};


const initialState = {};

const bookingsReducer = (state = initialState , action) => {
    switch(action.type){
        case LOAD_BOOKING:{
            return {...action.booking}
        }
        case LOAD_USER_BOOKINGS:{
            const newState = {};
            action.bookings.forEach(booking => {
                newState[booking.id] = booking;
            });
            return newState;
        }
        case ADD_BOOKING:{
            const newState ={[action.booking.id]:action.booking};
            return newState
        }
        case EDIT_BOOKING:{
            return{...action.booking}
        }
        case DELETE_BOOKING:{
            const newState = {...state};
            delete newState[action.bookingId];
            return newState
        }
        default:
            return state;
    }
};



  export default bookingsReducer;


  //* Might have to start with the state then debug from there
