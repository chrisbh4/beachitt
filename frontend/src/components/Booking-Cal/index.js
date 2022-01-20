import React, {useState} from "react";
import {useDispatch} from "react-redux"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import {fetchAddBooking} from "../../store/bookings"
import { getSingleUnit} from "../../store/rentalUnits"


/* Progress Table
        * Need to be able to remove the empty Object that is attached to the string of the selected Date
Inside the console the selected dates are being shown but with an empty Object I need to be able to remove that empty object at the end of both dates and be able to hold the selected dates as a
string so I can upload the splitted strings as seperated data parts that will be uploaded as day,month,year for both startDate and endDate


! Problem : I was recieving an empty object for each day selected
! Solution : I had to join the array together , then split the string by a unique char to be able to have individual selected dates and it's data.


*/


function BookingCal({userId, unitId}){
    const dispatch = useDispatch();
    const [startDate , setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    console.log("booking page:", unitId)

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
        
        await dispatch(fetchAddBooking(payload))
        dispatch(getSingleUnit(unitId))
        // alert("Your trip has been Booked");

    };



    return(
        <div class='flex justify-center '>
            <Calendar selectRange={true}  onChange={handleClick} minDate={new Date()}/>
            <div>

            <button type="submit" onClick={handleSubmit} >Book This Trip</button>
            </div>
        </div>
    )
}


export default BookingCal
