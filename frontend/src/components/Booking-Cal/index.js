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


    // console.log("Unit Bookings :", unitBookings)



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



    }

    function isBookingOpen(unitStart, unitEnd, checkStart, checkEnd) {
        const splitStart = unitStart.split("-");
        const splitEnd = unitEnd.split("-");
        const checkStartSplit = checkStart.split("-");
        const checkEndSplit = checkEnd.split("-");

        // const unitStartDate = new Date(splitStart[2], parseInt(splitStart[1]) - 1, splitStart[0]);
        // const testDate = Date.parse(unitStart)
        // console.log("Date test:", test)
        //* I  can place the unit.booking data inside the conditional as is since the func renders it
        //* need to verify by checking logs
        // console.log(Date.parse(unitStart) < Date.parse(checkStart))
        // console.log("unit", Date.parse(unitStart))
        // console.log("check", Date.parse(checkStart))


        // console.log(2 > 1)
        // const unitEndDate = new Date(splitEnd[2], parseInt(splitEnd[1]) - 1, splitEnd[0]);
        // const bookingStartDate = new Date(checkStartSplit[2], parseInt(checkStartSplit[1]) - 1, checkStartSplit[0]);
        // const bookingEndDate = new Date(checkEndSplit[2], parseInt(checkEndSplit[1]) - 1, checkEndSplit[0]);


        const unitStartDate = Date.parse(unitStart)
        const unitEndDate = Date.parse(unitStart)
        const bookingStartDate = Date.parse(checkStart)
        const bookingEndDate = Date.parse(checkEnd)


        // if (bookingStartDate > unitStartDate && bookingStartDate < unitEndDate) {
        if ((bookingStartDate > unitStartDate && bookingStartDate < unitEndDate) || (bookingEndDate > unitStartDate && bookingEndDate < unitEndDate)) {
           //* true = not available
            console.log(true)
            return true
        }
        else {
            //* if else then it means its open
            console.log("IS open :", false)
            return false
        }
    };




    const handleSubmit = async (e) => {
        e.preventDefault();

        unitBookings?.forEach((booking) => {
            const unitStartDate = booking.startDate;
            const unitEndDate = booking.endDate;
            const result = isBookingOpen(unitStartDate, unitEndDate, startDate, endDate);
//* This stops the forEach : only if the helper returns true
            if (result === true) {
                setErrors(["booking is unavailable, check bookings list to see booked dates."])
                return {msg:"can not double book"}
            }
        })

        const payload = { startDate, endDate, userId, rentalUnitId: unitId }
        const data = await dispatch(fetchAddBooking(payload))

        console.log("Book Errors: ",errors)

        if (data.errors) {
            setErrors(data.errors)
            return data.errors
        }
        dispatch(getSingleUnit(unitId))
        return data

        // const payload = {startDate, endDate ,userId, rentalUnitId:unitId}
        // const data = await dispatch(fetchAddBooking(payload))

        // if(data.errors){
        //     setErrors(data.errors)
        //     return data.errors
        // }
        // dispatch(getSingleUnit(unitId))

    };

    //* new Date() converts it to date format

    // console.log(new Date(startDate))
    // console.log(new Date(endDate))


    /*
    * Notes for configuring the function below
    - I'm able to access all the bookings that belong to the unit
        - Need to iterate through the bookings and grab both startDate and endDate
        - each iteration will throw both [ startDate, endDate ] inside the helper function that does the date checking
        Helper Function
        * will need to have an array that holds the error values that are pushed into it then that array will then be placed inside the setErrors function
        - index into the argument array and create two variables startCheck, endCheck : this will represent the selected dates
        (conditional rendering)
            - if startDate returns an error then have that error be pushed into the errorsArray : have the function return to stop the func from continuting
            - if endDate returns any errors then have them pushed into the errors Array
            - else dispatch the new booking

             * Bookings validate frontend funitonality
            Link: https://www.geeksforgeeks.org/how-to-check-if-one-date-is-between-two-dates-in-javascript/

    */

    const validateBookingDates = () => {
        unitBookings?.forEach((booking) => {
            const unitStartDate = booking.startDate;
            const unitEndDate = booking.endDate;

            const result = isBookingOpen(unitStartDate, unitEndDate, startDate, endDate);

            if (result === true) {
                setErrors("booking is unavailable, check bookings list to see booked dates.")
            };
        })

    }
    //iterate through this allows me to access the units.data
    // place the itearted data and the selectedDates inside the helper function
    // have to check both the selectedStart and selectedEnd inside the helper function
    // if the helper function returns false or true then that gives me my answer

    // function isBookingOpen(unitStart, unitEnd, checkStart, checkEnd) {
    //    const splitStart = unitStart.split("-");
    //    const splitEnd = unitEnd.split("-");
    //    const checkStartSplit = checkStart.split("-");
    //    const checkEndSplit = checkEnd.split("-");

    //     const unitStartDate = new Date(splitStart[2], parseInt(splitStart[1]) - 1, splitStart[0]);
    //     const unitEndDate = new Date(splitEnd[2], parseInt(splitEnd[1]) - 1, splitEnd[0]);
    //     const bookingStartDate = new Date(checkStartSplit[2], parseInt(checkStartSplit[1]) - 1, checkStartSplit[0]);
    //     const bookingEndDate = new Date(checkEndSplit[2], parseInt(checkEndSplit[1]) - 1, checkEndSplit[0]);

    //     if ( bookingStartDate > unitStartDate && bookingStartDate < unitEndDate || bookingEndDate > unitStartDate && bookingEndDate < unitEndDate ) {
    //         //* true = the date is unavilable
    //         //* false = the date is available
    //        return true
    //     } else {
    //         return false
    //     }
    // };




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
                                    <p key={error.id}>{error}</p>
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
