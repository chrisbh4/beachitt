import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import {fetchBooking , fetchEditBooking , fetchDeleteBooking} from "../../store/bookings";
import {getSingleUnit} from "../../store/rentalUnits";

/*
    ! Optimization notes
        * inside isBookingOpen()
            - replace Date.parse() variable with all the converted dates "checkStartConv, checkEndConv, unitStartConv, unitEndConv"
*/

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

    const [startDateConv, setStartDateCov] = useState("");
    const [endDateConv, setEndDateCov] = useState("");

    useEffect(()=>{
        setStartDate(booking?.startDate)
        setEndDate(booking?.endDate)
        setUserId(booking?.userId)
        setRentalUnitId(booking?.rentalUnitId)
    },[booking?.startDate, booking?.endDate, booking?.userId, booking?.rentalUnitId])


    const handleClick = (e) =>{
        let dates = e.join('').split("(Pacific Standard Time)")

        setStartDateCov(e[0])
        setEndDateCov(e[1])

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


    /*
    * Orignial
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

    */

   function isBookingOpen(unitStart, unitEnd, checkStart, checkEnd, unitBookingId) {

       const unitStartArr = unitStart.split('-')
       const unitEndSplit = unitEnd.split('-')

       const checkStartConv = startDateConv.valueOf();
       const checkEndConv = endDateConv.valueOf();

       const unitStartConv = new Date(unitStartArr[0], unitStartArr[1] - 1, unitStartArr[2]).valueOf()
       const unitEndConv = new Date(unitEndSplit[0], unitEndSplit[1] - 1, unitEndSplit[2]).valueOf()

       const unitStartDate = Date.parse(unitStart)
       const unitEndDate = Date.parse(unitEnd)
       const bookingStartDate = Date.parse(checkStart)
       const bookingEndDate = Date.parse(checkEnd)

//* same startDate but longer endDate changes : returns error
//* same startDate but shorter endDate : returns error
//* startDate was the endDate now endDate got longer
//* if start dates are the same , end dates are the same , end date can't be the same as unit.start
    if (checkStartConv === unitStartConv || checkStartConv === unitEndConv || checkEndConv === unitEndConv || checkEndConv === unitStartConv) {
        if(bookingId === unitBookingId){
            return false
        }
        return true
    }
//* start date can be less than unit.start but endDate must be less unit.end
    if( bookingStartDate < unitStartDate && bookingEndDate > unitEndDate ){
        return true
    }
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
        <div class='flex justify-center p-10 bg-yellow-200 '>
        <Calendar selectRange={true}  onChange={handleClick} minDate={new Date()}/>
        <div className="edit-booking-errors" class=' text-center flex items-center p-4' id="red" hidden={!errors.length} >
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
