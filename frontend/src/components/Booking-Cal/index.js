import React, { useState } from "react";
import { useDispatch } from "react-redux"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { fetchAddBooking } from "../../store/bookings"
import { getSingleUnit } from "../../store/rentalUnits"
import './booking.css'

/*
    TODO
        - same date booking allows for duplicates
        - When doing same day booking then book a startDate === to the same dayBooking it allows for overBooking
        * Before conversion the selected date and the unit date that is turned into a new Date() are exactly the same
            1.need to convert the unit date with new Date()
            2.need to have the checkStart to have its orginal format with PST
            3.use valueOf() to be able to have the dates be converted into miliseconds
            4. compare if the values are the same if so then return and set error startDate can't be the same as endDate
*/

function BookingCal({ userId, unitId, unitBookings }) {
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errors, setErrors] = useState([]);

    const [startDateConv, setStartDateCov] = useState("");
    const [endDateConv, setEndDateCov] = useState("");

    const handleClick = (e) => {


        let dates = e.join('').split(")")

        setStartDateCov(e[0])
        setEndDateCov(e[1])

        // console.log("Dates :", dates)

        const startArray = dates[0].split(' ')
        console.log("start date :", startArray)
        const endArray = dates[1].split(' ')

        // console.log("startDate before conv :", dates[0])

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

        // console.log("conv :", startDateStringConverter)

        setStartDate(startDateStringConverter);
        setEndDate(endDateStringConverter);
    };

    /*
    * Bookings validate frontend funitonality
    Link: https://www.geeksforgeeks.org/how-to-check-if-one-date-is-between-two-dates-in-javascript/

    - need to see both booking with the same startDate
    - if both unitStart and StartDate are === return "startDate is already taken"
    - if startDate === unitEnd date return "date is already taken"

    * might have to reconvert how the clicked date is placed into the helper function
    */
    function isBookingOpen(unitStart, unitEnd, checkStart, checkEnd) {
        const unitStartArr = unitStart.split('-')
        const unitEndSplit = unitEnd.split('-')

        //* Turns check dates into integers of date
        const checkStartCov = startDateConv.valueOf();
        const checkEndCov = endDateConv.valueOf();

        //* Turns pre-booked dates into integers
        const unitStartConv = new Date(unitStartArr[0], unitStartArr[1] - 1, unitStartArr[2]).valueOf()
        const unitEndConv = new Date(unitEndSplit[0], unitEndSplit[1] - 1, unitEndSplit[2]).valueOf()

        const unitStartDate = Date.parse(unitStart)
        const unitEndDate = Date.parse(unitEnd)
        const bookingStartDate = Date.parse(checkStart)
        const bookingEndDate = Date.parse(checkEnd)


// Allows for the selected dates to be booked a day prior to the other pre-booked dates
//! Safair conditional only
if((checkEndCov - 43400000) > unitStartDate && checkStartCov < unitStartDate){
    return true
}

//* true = not available ,  false = available
//* if selected start date is before unit start date but selected end date is ending after unit end date
//! Safair conditional only
        if (checkStartCov < unitStartDate && checkEndCov > unitEndDate){
            return true
        }

//* if selected dates are before unit start but inside the unit end dates
//! Safair conditional only
        // if(checkStartCov < unitStartDate && checkEndCov < unitEndDate && checkEndCov > unitStartDate) return true





//* if start dates are the same , end dates are the same , end date can't be the same as unit.start
        if (checkStartCov === unitStartConv || checkStartCov === unitEndConv || checkEndCov === unitEndConv || checkEndCov === unitStartConv) {
            return true
        }
 //* start date can be less than unit.start but endDate must be less unit.end
        if( bookingStartDate < unitStartDate && bookingEndDate > unitEndDate ){
            return true
        }
        if ((bookingStartDate > unitStartDate && bookingStartDate < unitEndDate) || (bookingEndDate > unitStartDate && bookingEndDate < unitEndDate)) {
            return true
        }


        if ((bookingStartDate > unitStartDate && bookingStartDate < unitEndDate) || (bookingEndDate > unitStartDate && bookingEndDate < unitEndDate)) {
            return true
        }
        return false
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let setter = false;

        if (startDate.length === 0 || endDate.length === 0) {
            setErrors(["Select two dates"])
            return;
        }

        unitBookings?.forEach(async (booking) => {
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

        if (setter) {
            return;
        } else {
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
        <div class='flex justify-center pt-2'>
            <Calendar selectRange={true} onChange={handleClick} minDate={new Date()} />
            <div class='self-center ml-5' >
                <div class='w-7/12 min-w-full  pb-4' id='booking-error' hidden={!errors.length} >
                    {
                        errors?.map((error) => {
                            if (error) {
                                return (
                                    <p id='test' class=' text-lg w-full' key={1}>{error}</p>
                                    )
                                }
                                return null;
                            })
                        }
                </div>
                        <button type="submit" id='booking' onClick={handleSubmit} >Book This Trip</button>
            </div>
        </div>
    )
}


export default BookingCal
