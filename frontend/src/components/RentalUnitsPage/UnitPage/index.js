import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getRentalUnits, getSingleUnit } from '../../../store/rentalUnits';

function GetRentalUnitPage() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const unit = useSelector(state => state.rentalUnit[id])
    console.log(unit)

    useEffect(() => {
        dispatch(getRentalUnits())
        dispatch(getSingleUnit())
    }, [dispatch])

    return (
        <div>
        <div class='justify-center flex pt-5 '  >

            <div id='unit-detail-image' class='w-7/12 '>
                <img class='min-h-full  ' src={`${unit?.url}`} alt={unit?.title} ></img>
            </div>

            <div class='bg-gray-200 w-4/12  flex flex-col  p-10  '>
                <div class='relative top-10 overflow-scroll '>
                <h2 class='text-center text-3xl pb-4 '>{unit?.title}</h2>
                <div className="unit-details" class='text-center   ' >
                    <div class='content-center'>
                    <p class='pb-2 text-xl '>Location: {unit?.city}, {unit?.state}, {unit?.zipcode} </p>
                    <p class='pb-2 text-xl'>Distance From Beach: {unit?.distanceFromBeach} miles </p>
                    <p class='pb-2 text-xl'>Price:$ {unit?.price} /per night</p>
                    <p class='pb-2 text-xl'> Rooms: {unit?.rooms} </p>
                    <p class='pb-2 text-xl'>Number of Bathrooms: {unit?.bathrooms} </p>

                    <p class='text-xl font-medium pt-3.5'>Description :</p>
                    <p class='pb-2 pt-1'>{unit?.rentalUnitDescription}</p>
                    </div>
                    </div>
                </div>

                <div class='flex justify-around relative top-1/4' >
                    <button> <a class='text-base p-5' href='/units'>Go Back</a> </button>
                    <button> <a href='/' class='text-base p-5' >Set Dates</a> </button>
                </div>
            </div>


            {/* Google Maps goes here */}

            {/*  Unit Reviews componenet goes here  */}


        </div>

        <div class=' w-full bg-gray-200 h-40 mt-3 flex flex-col justify-center items-center '>
           <h1>Google Maps</h1>
        </div>

        {/* Reviews will be a grid */}
        <div class=' w-full bg-gray-200 h-40 mt-3 flex flex-col justify-center items-center '>
            <h1 class=''>Reviews go here</h1>
            <h1>Reviews go here</h1>
            <h1>Reviews go here</h1>
        </div>

            {/* End of Container */}
        </div>


    )

}



// * items-center : will vertically center items

export default GetRentalUnitPage;
