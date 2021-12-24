import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRentalUnits } from '../../../store/rentalUnits'
import "../../RentalUnitsPage/UnitsPage.css"

function RentalUnitsPage() {

    const dispatch = useDispatch();
    const rentalUnits = useSelector((state) => Object.values(state.rentalUnit))
    const state = useSelector((state) => Object.values(state.rentalUnit))

    const [allUnits , setUnits] = useState([]);

    // useEffect(() => {
    //     dispatch(getRentalUnits())

    //     setUnits(rentalUnits)

    // }, [dispatch, rentalUnits])

    console.log(rentalUnits)

    useEffect(() => {
        dispatch(getRentalUnits())

    }, [dispatch])

    // console.log(allUnits)


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

            <div className='all-unit-container' >
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

                            <div class='flex justify-center' >
                                <div class='relative top-0.5 text-sm'>
                            <i
                            className="fas fa-umbrella-beach"
                            ></i>
                            </div>
                            <h2 class='ml-2.5'>
                                <Link
                                    className="unit-titel"
                                    to={`/units/edit/${unit.id}`}>
                                    {unit.title}</Link>
                            </h2>

                            </div>



                            <div className="unit-location">
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



        </>

    )
}


export default RentalUnitsPage
