import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import {fetchBooking , fetchEditBooking , fetchDeleteBooking} from "../../store/bookings";
import {getSingleUnit} from "../../store/rentalUnits";

function EditBookingPage({bookingId , submitModal , unitBookings}){
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

    const handleBookingDelete =  async (e) => {
        e.preventDefault();
        await dispatch(fetchDeleteBooking(bookingId));
        dispatch(getSingleUnit(id));
        submitModal(false)
        return {msg:"Booking has been removed."}
    };

    function isBookingOpen(unitStart, unitEnd, checkStart, checkEnd , unitBookingId) {
        const unitStartDate = Date.parse(unitStart)
        const unitEndDate = Date.parse(unitEnd)
        const bookingStartDate = Date.parse(checkStart)
        const bookingEndDate = Date.parse(checkEnd)

        if ((bookingStartDate > unitStartDate && bookingStartDate < unitEndDate) || (bookingEndDate > unitStartDate && bookingEndDate < unitEndDate)) {
            if(bookingId === unitBookingId){
                return false
            }
            return true
        }
        return false
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        let setter = false ;

        unitBookings?.forEach(async(booking) => {
            const unitStartDate = booking.startDate;
            const unitEndDate = booking.endDate;
            const unitBookingId = booking.id;
            const result = isBookingOpen(unitStartDate, unitEndDate, startDate, endDate, unitBookingId);

            if (result === true) {
                setErrors(["Dates are unavailable, check bookings list to see booked dates."])
                setter = true;
                return;
            }
        });

        if(setter){
            return;
        }else{
            setErrors([]);
            const payload = {id,startDate, endDate ,userId, rentalUnitId}
            const data = await dispatch(fetchEditBooking(payload, bookingId))

            if (data.errors) {
                setErrors(data.errors)
                return data.errors
            }
            await dispatch(getSingleUnit(rentalUnitId))
            submitModal(false)
            return data
        }

    };

    return(
        <div class='flex justify-center p-10 '>
        <Calendar selectRange={true}  onChange={handleClick} minDate={new Date()}/>
        <div className="edit-booking-errors" hidden={!errors.length} >
                    {
                        errors?.map((error) => {
                            if (error) {
                                return (
                                    <p key={1}>{error}</p>
                                )}
                            return null;
                        })
                    }
        </div>
        <div class="flex flex-col  justify-center ml-4">
        <button type="submit" onClick={handleSubmit} >Update</button>
        <button type="submit" onClick={handleBookingDelete} class='mt-3' >Delete</button>
        </div>
    </div>
    )

};


export default EditBookingPage
