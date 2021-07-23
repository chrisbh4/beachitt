import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { NavLink } from 'react-router-dom';
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
            {/* <nav>
                <NavLink to='/units/new'>Register New Unit</NavLink>
            </nav> */}
            <h1>Beach Properties</h1>

            <div className='all-unit-container' >
                {rentalUnits.map((unit)=>{
                    return(
                        <div key={unit.id}>
                            <h3>{unit.title}</h3>
                            <div className="unit-Info">
                                <h4>Unit Description:</h4>
                                <p>Location: {unit.city}, {unit.state}, {unit.zipcode} </p>
                                <p>Distance From Beach: {unit.distanceFromBeach} miles </p>
                                <p>Price: {unit.price} /per night</p>
                                <p>Number of Rooms:{unit.rooms} </p>
                                <p>Number of Bathrooms:{unit.bathrooms} </p>
                                <p>{unit.rentalUnitDescription}</p>
                            </div>

                        </div>
                    )
                })}
            </div>



        </div>

    )
}


export default RentalUnitsPage
