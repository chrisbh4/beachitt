import React, {useState} from "react";
import {useDispatch} from "react-redux"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import {fetchAddBooking} from "../../store/bookings"
import { getSingleUnit} from "../../store/rentalUnits"



function BookingCal({userId, unitId, unitBookings}){
    const dispatch = useDispatch();
    const [startDate , setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errors , setErrors] = useState([]);


    console.log("Unit Bookings :", unitBookings)



    const handleClick = (e) =>{

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




    const handleSubmit = async (e) =>{
        e.preventDefault();
        const payload = {startDate, endDate ,userId, rentalUnitId:unitId}

        const data = await dispatch(fetchAddBooking(payload))

        if(data.errors){
            setErrors(data.errors)
            return data.errors
        }
        dispatch(getSingleUnit(unitId))

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

// const testBooking = unitBookings[0]
// console.log("test:",testBooking.startDate)
// console.log("split test:",testBooking.endDate.split('-'));

const validate = unitBookings?.forEach((booking)=>{
    const startDate = booking.startDate;
    const endDate = booking.endDate;

    console.log("valid :", startDate)
})


    function isBookingOpen(arrStart, arrEnd, checkDates) {
       let startDates = arrStart.split("-");
       let endDates = arrEnd.split("-");
       let selectedDate = checkDates.split("-");

        var startDate = new Date(startDates[2], parseInt(startDates[1]) - 1, startDates[0]);
        var endDate = new Date(endDates[2], parseInt(endDates[1]) - 1, endDates[0]);
        var checkedDate = new Date(selectedDate[2], parseInt(selectedDate[1]) - 1, selectedDate[0]);

        if (checkedDate > startDate && checkedDate < endDate) {
            //* true = the date is unavilable
            //* false = the date is available
           return true
        } else {
            return false
        }
    };




    return(
        <div class='flex justify-center '>
            <Calendar selectRange={true}  onChange={handleClick} minDate={new Date()}/>
            <div>

            <button type="submit" onClick={handleSubmit} >Book This Trip</button>

            <div className="new-booking-errors" hidden={!errors.length} >
                        {
                            errors.map((error) => {
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
