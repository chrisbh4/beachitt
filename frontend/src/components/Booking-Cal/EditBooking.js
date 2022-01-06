import React, {useState, useEffect} from "react";
import { useParams , useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import {fetchBooking , fetchEditBooking , fetchDeleteBooking} from "../../store/bookings";




function EditBookingPage(){


    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const loggedInUser = useSelector((state)=> state.session.user.id);
    const booking = useSelector((state)=> state.bookings);

    useEffect(()=>{
    dispatch(fetchBooking(id))
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
        await dispatch(fetchEditBooking(payload, id))
        // alert("Your trip has been updated.");
        history.push(`/units/${rentalUnitId}`)
        return

    };



    const handleBookingDelete =  async (e) => {
        e.preventDefault();
        dispatch(fetchDeleteBooking(id));
        // alert("Trip has been canceled");
        history.push(`/units/${rentalUnitId}`)
        return
    }


    const handleBackButton =  async (e) => {
        e.preventDefault();
        history.push(`/units/${rentalUnitId}`)
        return
    }



    return(
        <div class='flex justify-center '>
        <Calendar selectRange={true}  onChange={handleClick} minDate={new Date()}/>
        <div>

        <button type="submit" onClick={handleSubmit} >Update</button>
        <button type="submit" onClick={handleBookingDelete} >Delete</button>
        <button type="submit" onClick={handleBackButton} >Go Back</button>
        </div>
    </div>
    )

}



export default EditBookingPage
