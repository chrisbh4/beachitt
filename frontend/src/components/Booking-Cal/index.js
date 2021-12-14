import React, {useState} from "react";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';


/* Progress Table

        * Need to be able to remove the empty Object that is attached to the string of the selected Date

*/


function BookingCal(){

    const [start , setStart] = useState([]);
    const [end, setEnd] = useState([]);
    // data['start'] = 0;

    const handleClick =async (e) =>{
        let data = {}

        data['start'] = e[0]
        data['end'] = e[1]

        console.log(data)

        // console.log(e)
        // e.preventDefault();
        // let arr1 =
        setStart(e[0])
        // let arr2 =
        setEnd(e[1])
        // console.log(arr1)
        // console.log(arr2)
    }
    // console.log(data)

    return(
        <div class='flex justify-center'>
            <Calendar selectRange={true}  onChange={handleClick}/>
        </div>
    )
}


export default BookingCal
