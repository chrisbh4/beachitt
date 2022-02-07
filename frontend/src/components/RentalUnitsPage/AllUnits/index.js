import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRentalUnits } from '../../../store/rentalUnits'
import "../../RentalUnitsPage/UnitsPage.css"

function RentalUnitsPage() {

    const dispatch = useDispatch();
    const rentalUnits = useSelector((state) => Object.values(state?.rentalUnit))

    useEffect(() => {
        dispatch(getRentalUnits())

    }, [dispatch])



    /*

         useEffect(()=>{
             setComment(review?.comment)
             setRating(review.rating)
            setImage(review.image)
        },[review.rating, review.comment, review.image])

    */



    return (

        <>

            <h1 className="unitsPage-h1">Beach Properties</h1>

            <div className='all-unit-container' id='outer-div' >
                {rentalUnits.map((unit) => {
                    return (
                        <div

                            className="unit-div"
                            key={unit.id}>

                            <div>

                                <Link
                                    to={`/units/${unit.id}`}>

                                    <img
                                        class='mx-auto'
                                        src={`${unit.url}`}
                                        alt={`${unit.title}`}
                                    >

                                    </img>
                                </Link>

                            </div>



                            <div className="unit-location" class='pt-2.5'>
                                <div class='text-center' >

                                    <div className="unit-item-container" class='justify-center flex' >
                                        <p className="unit-item"> Location: {unit.city}, {unit.state}, {unit.zipcode} </p>
                                    </div>
                                    <div className="unit-item-container" class='justify-center flex' >
                                        <p className="unit-item">Distance From Beach: {unit.distanceFromBeach} mile/s </p>
                                    </div>

                                    {/* <h4 className='unit-headers'>Unit Description:</h4>
                                <ul className="unit-descripiton-container"> */}
                                    {/* <div className="unit-item-container">
                                        <i className="fas fa-umbrella-beach"></i>
                                        <li className="unit-item">Price:${unit.price} /per night</li>
                                    </div> */}

                                    <div className="unit-item-container" class='justify-center flex'>

                                        <p className="unit-item">Number of Rooms:{unit.rooms} </p>
                                    </div>

                                    {/* <div className="unit-item-container">
                                        <i className="fas fa-umbrella-beach"></i>
                                        <li className="unit-item">Number of Bathrooms:{unit.bathrooms} </li>
                                    </div> */}

                                    {/* <div className="unit-item-container unit-textbox">
                                        <i className="fas fa-umbrella-beach"></i>
                                        <li className="unit-item">{unit.rentalUnitDescription}</li>
                                    </div> */}


                                </div>
                            </div>

                        </div>
                    )
                })}
            </div>
            <footer class='text-center h-15 '>
                <p class='text-xl'>Christian Brown</p>
                <div class="text-2xl">
                    <a class='pr-2' href="https://www.linkedin.com/in/christian-brown-8770311ba/">
                        <i class="fab fa-linkedin"></i>
                    </a>
                    <a class='pr-2' href="mailto:Chrismbh4@gmail.com">
                        <i class="fas fa-envelope-square"></i>
                    </a>

                    <a  href="https://github.com/chrisbh4">
                        <i class="fab fa-github"></i>
                    </a>
                </div>
            </footer>
        </>

    )
}


export default RentalUnitsPage
