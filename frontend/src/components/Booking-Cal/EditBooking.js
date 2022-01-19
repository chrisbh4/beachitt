import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import {fetchBooking , fetchEditBooking , fetchDeleteBooking} from "../../store/bookings";
import {getSingleUnit} from "../../store/rentalUnits";


/*
1/18/22
    - Booking updates on POST but idk where the data refresh is coming from
    - PUT needs to fetch for a data refresh for the unit page
    - DELETE needs to fetch for a data refresh for the unit page

*/

function EditBookingPage({bookingId}){
    // const bookingId = bookingId;
    //* This is grabbing the Unit ID not the Booking ID
    const {id} = useParams();
    const dispatch = useDispatch();
    const loggedInUser = useSelector((state)=> state.session.user.id);
    const booking = useSelector((state)=> state.bookings);


    console.log("-----")
    console.log("booking:",bookingId)

    useEffect(()=>{
    dispatch(fetchBooking(bookingId))
    },[dispatch,id])


    const [startDate , setStartDate] = useState(booking.startDate);
    const [endDate, setEndDate] = useState(booking.endDate);
    const userId = booking.userId;
    const rentalUnitId = booking.rentalUnitId;



    const handleClick = (e) =>{
        let dates = e.join('').split("(Pacific Standard Time)")
        const startArray = dates[0].split(' ')
        const endArray = dates[1].split(' ')

        const startDateStringConverter = `${startArray[3]}-${startArray[1]}-${startArray[2]}`
        const endDateStringConverter = `${endArray[3]}-${endArray[1]}-${endArray[2]}`

        setStartDate(startDateStringConverter);
        setEndDate(endDateStringConverter);
        return
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const payload = {id,startDate, endDate ,userId, rentalUnitId}
        const data = await dispatch(fetchEditBooking(payload, id))
        dispatch(getSingleUnit(id));
        return data
    };



    const handleBookingDelete =  async (e) => {
        e.preventDefault();
        await dispatch(fetchDeleteBooking(bookingId));
        dispatch(getSingleUnit(id));
        return {msg:"Booking has been removed."}
    }




    return(
        <div class='flex justify-center '>
        <Calendar selectRange={true}  onChange={handleClick} minDate={new Date()}/>
        <div>

        <button type="submit" onClick={handleSubmit} >Update</button>
        <button type="submit" onClick={handleBookingDelete} >Delete</button>
        {/* <button type="submit" onClick={handleBackButton} >Go Back</button> */}
        </div>
    </div>
    )

}



export default EditBookingPage
