import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRentalUnits } from '../../store/rentalUnits'

function RentalUnitsPage (){

    const dispatch = useDispatch();

     const rentalUnits = useSelector((state)=> Object.values(state.rentalUnit))
    // const rentalUnits = useSelector((state)=> state.rentalUnit)


    console.log('RENTAL-UNITS: ',rentalUnits)


    useEffect(()=>{
        dispatch(getRentalUnits())
    },[dispatch])
    // console.log('RENTAL-UNITS: ',rentalUnits)

    return(
        <div>
            <h1>Beach Properties</h1>
            {/* <h3>{rentalUnits[1]}</h3> */}
            <ul>
               {rentalUnits.map((rentalUnit)=>{
                   if(rentalUnit.id){
                       return (
                           <li key={rentalUnit.id}>
                               {rentalUnit.title}
                           </li>
                       )
                   }
               })}
            </ul>

        </div>

    )
}


export default RentalUnitsPage
