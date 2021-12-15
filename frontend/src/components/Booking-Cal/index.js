import React, {useState} from "react";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';


/* Progress Table
        * Need to be able to remove the empty Object that is attached to the string of the selected Date
Inside the console the selected dates are being shown but with an empty Object I need to be able to remove that empty object at the end of both dates and be able to hold the selected dates as a
string so I can upload the splitted strings as seperated data parts that will be uploaded as day,month,year for both startDate and endDate

*/


function BookingCal(){

    const [start , setStart] = useState([]);
    const [end, setEnd] = useState([]);
    // data['start'] = 0;

    const handleClick =async (e) =>{

        //* Will need this later after figuring out how to remove extra {}
        // let data = {}
        // data['start'] = e[0]
        // data['end'] = e[1]

        setStart(e[0])
        setEnd(e[1])
    }
    // console.log(data)

    return(
        <div class='flex justify-center'>
            <Calendar selectRange={true}  onChange={handleClick}/>
        </div>
    )
}


export default BookingCal
