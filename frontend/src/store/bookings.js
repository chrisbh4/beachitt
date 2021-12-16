
const ADD_BOOKING = 'booking/ADD_BOOKING';
const DELETE_BOOKING= 'booking/DELETE_BOOKING';
const EDIT_BOOKING= 'booking/EDIT_BOOKING';


  const addBooking = booking => ({
    type: ADD_BOOKING,
    booking,
  });


  const deleteBooking = (bookingId)=>({
    type: DELETE_BOOKING,
    bookingId,
  })

  const editbooking = (bookingId)=>({
    type:EDIT_BOOKING,
    bookingId,
  })


export const fetchAddBooking = async(payload) =>{
    const res = await csrfFetch('/api/bookings/new',{
        method:"POST",
        body:JSON.stringify(payload),
        headers:{"Content-Type":"application/JSON"}
    })

    const data = res.json();
    if(data.ok) dispatch(addBooking(data))
    return data
};


export const fetchEditBooking = async(payload, bookingId) =>{
    const res = await csrfFetch(`/api/bookings/${bookingId}`,{
        method:"PUT",
        body:JSON.stringify(payload),
        headers:{"Content-Type":"application/JSON"}
    })
    const data = res.json();
    if(data.ok) dispatch(editBooking(data))
    return data
};





const bookingReducer = () => {

};



  export default bookingsReducer
