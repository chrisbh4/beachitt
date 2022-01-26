import React, { useState } from "react";
import { useDispatch } from "react-redux"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { fetchAddBooking } from "../../store/bookings"
import { getSingleUnit } from "../../store/rentalUnits"

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

    const [testStart, setTestStart ] = useState("");
    const [testEnd, setTestEnd ] = useState("");

//! this is working
    console.log(testStart.valueOf())
    console.log(testEnd);
    const handleClick = (e) => {

        let dates = e.join('').split("(Pacific Standard Time)")

        setTestStart(e[0])
        setTestEnd(e[1])

        //gives ms value
        // console.log("dates", x.valueOf())



        const startArray = dates[0].split(' ')
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

        // console.log(unitStart.split('-'))

        const test = unitStart.split('-')
        // const testCheck = checkStart.split('-')
        // console.log(testCheck)
        console.log("Unit start date :", new Date(test[0],test[1]-1,test[2]))
        // console.log("check date :", new Date(testCheck[0],testCheck[1]-1,testCheck[2]))
        // console.log("checkStart :", checkStart.getTime() )



        const unitStartDate = Date.parse(unitStart)
        const unitEndDate = Date.parse(unitEnd)
        const bookingStartDate = Date.parse(checkStart)
        const bookingEndDate = Date.parse(checkEnd)



        //* need to remeber to set the errors state back to an empty array
        if ((bookingStartDate > unitStartDate && bookingStartDate < unitEndDate) || (bookingEndDate > unitStartDate && bookingEndDate < unitEndDate)) {
            // if( )
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
                                )}
                            return null;
                        })
                    }
                </div>
            </div>
        </div>
    )
}


export default BookingCal
