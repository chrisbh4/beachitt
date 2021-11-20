import React, { useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getRentalUnits, getSingleUnit } from '../../../store/rentalUnits';

function GetRentalUnitPage() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const unit = useSelector(state => state?.rentalUnit[id])
    const userId = useSelector(state => state?.session.user.id)
    const unitReviews = unit?.Reviews;
    console.log("Unit owner :", unit?.ownerId)
    // console.log("Unit owner :", unitReviews[0])

    useEffect(() => {
        dispatch(getRentalUnits())
        // dispatch(getSingleUnit())
    }, [dispatch])



const editOrBook = () => {
        if (userId === unit?.ownerId) {
            return (
                <>
                    <button
                        class=" p-5"
                    >
                        <a href={`/units/${unit?.id}/edit`}>Edit</a>
                    </button>
                </>
            )
        } else {
            // create bookings functionality
            return (
                // <button ><a href={`/bookings`}>Book a trip</a></button>
                <>
                <button
                    class=" p-5"
                ><a href={`/`}>Book a trip</a></button>
                </>
            )
        }
    }

// * Dispaly Reviews Functionality

const displayReviews = () =>{
  return  unitReviews?.map((review)=>{
        return(
            <>
            <div id="review-row" class="text-black grid grid-cols-2">
                <div id="review-username" class="text-center">
                    <p>username</p>
                </div>
                <div id="review-comment" class="text-center">
                    {editReview(review)}
                </div>
            </div>
            </>

        )
    })

}

//* Edit Review functionality

const editReview = (review) => {
    if( userId ===  review.userId ){
        return (
            <div class="flex justify-center">
            <p class="pl-3 relattive left-2">{review.comment}</p>
            {/* <button><a href={`/reviews/${review.id}`}>Edit</a> </button> */}
            <div class='relative left-3'>

            <button><a href={`/`}>Edit</a> </button>
            </div>
            </div>
        )
    }else{
        return(
            <p>{review.comment}</p>
        )
    }
}

//* add username in the comment model it will grab the email and split on the @
// const getReviewUsername = () =>{
//     if()
// }

    return (
        <div>
            <div class='justify-center flex pt-5 '  >

                <div id='unit-detail-image' class='w-7/12 '>
                    <img class='min-h-full  ' src={`${unit?.url}`} alt={unit?.title} ></img>
                </div>

                <div id="details-container" class='bg-gray-200 w-4/12  flex flex-col  p-10  overflow-scroll '>
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

                    <div class='flex justify-around relative top-1/4 z-' >
                        <button> <a class=' p-5' href='/units'>Go Back</a> </button>
                        <>
                        {editOrBook()}
                        </>
                    </div>
                </div>


                {/* Google Maps goes here */}



            </div>

            <div class=' w-full bg-gray-200 h-40 mt-3 flex flex-col justify-center items-center '>
                <h1>Google Maps</h1>
            </div>

            {/* Reviews will be a grid */}
            <div class=' w-full bg-gray-200 h-40 mt-3 '>
                <div class='flex justify-around'>
                <p class='underline font-medium text-3xl '>Username </p>
                <p class='underline font-medium text-3xl '>Comment </p>
                </div>
                {displayReviews()}

            </div>

            {/* End of Container */}
        </div>


    )

}



// * items-center : will vertically center items

export default GetRentalUnitPage;
