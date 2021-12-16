import React, {useState} from "react";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';


/* Progress Table
        * Need to be able to remove the empty Object that is attached to the string of the selected Date
Inside the console the selected dates are being shown but with an empty Object I need to be able to remove that empty object at the end of both dates and be able to hold the selected dates as a
string so I can upload the splitted strings as seperated data parts that will be uploaded as day,month,year for both startDate and endDate


! Problem : I was recieving an empty object for each day selected
! Solution : I had to join the array together , then split the string by a unique char to be able to have individual selected dates and it's data.


*/


function BookingCal(){

    // const [start , setStart] = useState([]);
    // const [end, setEnd] = useState([]);
    // data['start'] = 0;



    const handleClick = (e) =>{

        let dates = e.join('').split("(Pacific Standard Time)")

        const startArray = dates[0].split(' ')
        const endArray = dates[1].split(' ')

        const startDateObj = {
            weekday: startArray[0],
            month:startArray[1],
            day:startArray[2],
            year:startArray[3],
            time:startArray[4]
        }

        const endDateObj = {
            weekday:endArray[0],
            month:endArray[1],
            day:endArray[2],
            year:endArray[3],
            time:endArray[4]
        }

        console.log(startDateObj)
        console.log(endDateObj)

        // setStart(data[0])
        // setEnd(data[1])
    }

    const handleSubmit = (e) =>{
        
    }



    return(
        <div class='flex justify-center'>
            <Calendar selectRange={true}  onChange={handleClick} minDate={new Date()}/>
            <button>Book This Trip</button>
        </div>
    )
}


export default BookingCal
