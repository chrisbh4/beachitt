import React, { useState } from "react";
import { useDispatch } from "react-redux"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { fetchAddBooking } from "../../store/bookings"
import { getSingleUnit } from "../../store/rentalUnits"



function BookingCal({ userId, unitId, unitBookings }) {
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errors, setErrors] = useState([]);



    const handleClick = (e) => {
        let dates = e.join('').split("(Pacific Standard Time)")

        const startArray = dates[0].split(' ')
        const endArray = dates[1].split(' ')

        // const startDateObj = {
        //     weekday: startArray[0],
        //     month:startArray[1],
        //     day:startArray[2],
        //     year:startArray[3],
        //     time:startArray[4]
        // }

        // const endDateObj = {
        //     weekday:endArray[0],
        //     month:endArray[1],
        //     day:endArray[2],
        //     year:endArray[3],
        //     time:endArray[4]
        // }

        const startDateStringConverter = `${startArray[3]}-${startArray[1]}-${startArray[2]}`
        const endDateStringConverter = `${endArray[3]}-${endArray[1]}-${endArray[2]}`

        setStartDate(startDateStringConverter);
        setEndDate(endDateStringConverter);
    };

    /*
    * Bookings validate frontend funitonality
    Link: https://www.geeksforgeeks.org/how-to-check-if-one-date-is-between-two-dates-in-javascript/
    */
    function isBookingOpen(unitStart, unitEnd, checkStart, checkEnd) {
        const unitStartDate = Date.parse(unitStart)
        const unitEndDate = Date.parse(unitEnd)
        const bookingStartDate = Date.parse(checkStart)
        const bookingEndDate = Date.parse(checkEnd)

        //* need to remeber to set the errors state back to an empty array
        if ((bookingStartDate > unitStartDate && bookingStartDate < unitEndDate) || (bookingEndDate > unitStartDate && bookingEndDate < unitEndDate)) {
            //* true = not available
            return true
        }
        return false
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let setter = false ;

        if(startDate.length === 0 || endDate.length === 0){
            setErrors(["Select two dates"])
            return;
        }

        unitBookings?.forEach(async(booking) => {
            const unitStartDate = booking.startDate;
            const unitEndDate = booking.endDate;
            const result = isBookingOpen(unitStartDate, unitEndDate, startDate, endDate);
            //* This stops the forEach : only if the helper returns true
            if (result === true) {
                setErrors(["booking is unavailable, check bookings list to see booked dates."])
                setter = true
                return;
            }
        });
        //* errors are never set into the array until the function ends
        // need to double check error verification and make sure error bookings dont get booked
        //* go to study hall to double check scoping understanding and when returing inside a function with a if conditon should end the function, correct or no?

        console.log("Before if :", setter)
        if(setter){
            return;
        }else{
            setErrors([]);
            const payload = { startDate, endDate, userId, rentalUnitId: unitId }
            const data = await dispatch(fetchAddBooking(payload))

            if (data.errors) {
                setErrors(data.errors)
                return data.errors
            }
            await dispatch(getSingleUnit(unitId))
            return data
        }
    };

    return (
        <div class='flex justify-center '>
            <Calendar selectRange={true} onChange={handleClick} minDate={new Date()} />
            <div>

                <button type="submit" onClick={handleSubmit} >Book This Trip</button>

                <div className="new-booking-errors" hidden={!errors.length} >
                    {
                        errors?.map((error) => {
                            if (error) {
                                return (
                                    <p key={1}>{error}</p>
                                )
                            }
                            return null;
                        })
                    }
                </div>

            </div>
        </div>
    )
}


export default BookingCal
