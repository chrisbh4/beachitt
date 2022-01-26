import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import {fetchBooking , fetchEditBooking , fetchDeleteBooking} from "../../store/bookings";
import {getSingleUnit} from "../../store/rentalUnits";




function EditBookingPage({bookingId , submitModal}){
    const {id} = useParams();
    const dispatch = useDispatch();
    const booking = useSelector((state)=> state.bookings);

    useEffect(()=>{
        dispatch(fetchBooking(bookingId))
    },[dispatch,bookingId])


    const [startDate , setStartDate] = useState(booking.startDate);
    const [endDate, setEndDate] = useState(booking.endDate);
    const [userId, setUserId] = useState(booking.userId);
    const [rentalUnitId, setRentalUnitId] = useState(booking.rentalUnitId);
    const [errors , setErrors] = useState([]);

    useEffect(()=>{
        setStartDate(booking?.startDate)
        setEndDate(booking?.endDate)
        setUserId(booking?.userId)
        setRentalUnitId(booking?.rentalUnitId)
    },[booking?.startDate, booking?.endDate, booking?.userId, booking?.rentalUnitId])


    const handleClick = (e) =>{
        let dates = e.join('').split("(Pacific Standard Time)")
        const startArray = dates[0].split(' ')
        const endArray = dates[1].split(' ')

        const startDateStringConverter = `${startArray[3]}-${startArray[1]}-${startArray[2]}`
        const endDateStringConverter = `${endArray[3]}-${endArray[1]}-${endArray[2]}`

        setStartDate(startDateStringConverter);
        setEndDate(endDateStringConverter);
        return {msg:"Start and End dates have been clicked."}
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const payload = {id,startDate, endDate ,userId, rentalUnitId}
        const data = await dispatch(fetchEditBooking(payload, bookingId))
        dispatch(getSingleUnit(id));
        submitModal(false)
        return data
    };

    const handleBookingDelete =  async (e) => {
        e.preventDefault();
        await dispatch(fetchDeleteBooking(bookingId));
        dispatch(getSingleUnit(id));
        submitModal(false)
        return {msg:"Booking has been removed."}
    };


    //* from new booking form

//     function isBookingOpen(unitStart, unitEnd, checkStart, checkEnd) {
//         const unitStartDate = Date.parse(unitStart)
//         const unitEndDate = Date.parse(unitEnd)
//         const bookingStartDate = Date.parse(checkStart)
//         const bookingEndDate = Date.parse(checkEnd)


//         //* need to remeber to set the errors state back to an empty array
//         if ((bookingStartDate > unitStartDate && bookingStartDate < unitEndDate) || (bookingEndDate > unitStartDate && bookingEndDate < unitEndDate)) {
//             //* true = not available
//             return true
//         }

//         return false
//     };


// console.log("errors outside func :", errors)

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         let setter = false ;

//         unitBookings?.forEach(async(booking) => {
//             const unitStartDate = booking.startDate;
//             const unitEndDate = booking.endDate;
//             const result = isBookingOpen(unitStartDate, unitEndDate, startDate, endDate);
//             //* This stops the forEach : only if the helper returns true

//             if (result === true) {
//                 setErrors(["booking is unavailable, check bookings list to see booked dates."])
//                 setter = true
//                 return;
//             }
//         });

//         //* errors are never set into the array until the function ends
//         // need to double check error verification and make sure error bookings dont get booked
//         //* go to study hall to double check scoping understanding and when returing inside a function with a if conditon should end the function, correct or no?

//         console.log("Before if :", setter)
//         if(setter){
//             //console.log("error has length :", errors);
//             return;
//         }else{
//             setErrors([]);
//             const payload = { startDate, endDate, userId, rentalUnitId: unitId }
//             const data = await dispatch(fetchAddBooking(payload))


//             if (data.errors) {
//                 setErrors(data.errors)
//                 return data.errors
//             }
//             await dispatch(getSingleUnit(unitId))
//             return data

//         }


//     };


    return(
        <div class='flex justify-center p-10 '>
        <Calendar selectRange={true}  onChange={handleClick} minDate={new Date()}/>
        <div class="flex flex-col  justify-center ml-4">
        <button type="submit" onClick={handleSubmit} >Update</button>
        <button type="submit" onClick={handleBookingDelete} class='mt-3' >Delete</button>
        </div>
    </div>
    )

};



export default EditBookingPage
