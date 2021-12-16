
const ADD_ONE = 'booking/ADD_ONE';
const DELETE_UNIT= 'booking/DELETE_UNIT';
const EDIT_UNIT= 'booking/EDIT_UNIT';


  const addBooking = booking => ({
    type: ADD_ONE,
    booking,
  });

  const deletebooking = (bookingId)=>({
    type: DELETE_booking,
    bookingId,
  })

  const editbooking = (bookingId)=>({
    type:EDIT_booking,
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
