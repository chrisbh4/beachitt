import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getRentalUnits } from '../../store/rentalUnits'
import '../RentalUnitsPage/UnitsPage.css'

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
            <h1 className="unitsPage-h1">Beach Properties</h1>

            <div className='all-unit-container' >
                {rentalUnits.map((unit)=>{
                    return(
                        <div
                            className="unit-div"
                            key={unit.id}>
                            <h3>
                            <Link
                                className="unit-titel"
                            to={`/units/edit/${unit.id}`}>
                                {unit.title}</Link>
                            </h3>
                            <div className="unit-location">
                                <h4 className='unit-headers'>Location Description:</h4>
                                <ul>
                                <div className="unit-item-container">
                                        <i class="fas fa-umbrella-beach"></i>
                                    <li className="unit-item"> Location: {unit.city}, {unit.state}, {unit.zipcode} </li>
                                    </div>
                                    <div className="unit-item-container">
                                        <i class="fas fa-umbrella-beach"></i>
                                    <li className="unit-item">Distance From Beach: {unit.distanceFromBeach} mile/s </li>
                                    </div>
                                </ul>
                                    <h4 className='unit-headers'>Unit Description:</h4>
                                <ul className="unit-descripiton-container">
                                    <div className="unit-item-container">
                                        <i class="fas fa-umbrella-beach"></i>
                                        <li className="unit-item">Price:${unit.price} /per night</li>
                                    </div>
                                    <div className="unit-item-container">
                                        <i class="fas fa-umbrella-beach"></i>
                                        <li className="unit-item">Number of Rooms:{unit.rooms} </li>
                                    </div>
                                    <div className="unit-item-container">
                                        <i class="fas fa-umbrella-beach"></i>
                                        <li className="unit-item">Number of Bathrooms:{unit.bathrooms} </li>

                                    </div>
                                    <div className="unit-item-container unit-textbox">
                                        <i class="fas fa-umbrella-beach"></i>
                                        <li className="unit-item">{unit.rentalUnitDescription}</li>
                                    </div>


                                </ul>
                            </div>

                        </div>
                    )
                })}
            </div>



        </div>

    )
}


export default RentalUnitsPage
