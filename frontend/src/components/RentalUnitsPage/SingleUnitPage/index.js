import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getRentalUnits , getSingleUnit } from '../../../store/rentalUnits';
import { deleteReview } from "../../../store/reviews"
import { fetchDeleteBooking } from '../../../store/bookings';
import MapContainer from '../../Maps';
import BookingCal from '../../Booking-Cal';
import EditUnitModal from '../../Modals/Units/EditModal';
import NewReviewModal from "../../Modals/Reviews/NewModal.js"
import EditReviewModal from '../../Modals/Reviews/EditModal';
import EditBookingModal from '../../Modals/Bookings/EditModal';
// import EditReviewModal from "../../Modals/Reviews"

function GetSingleUnitPage() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const unit = useSelector(state => state?.rentalUnit)
    const userId = useSelector(state => state?.session.user.id)
    const unitReviews = unit?.Reviews;
    const unitBookings = unit?.Bookings;

    const unitLat = unit?.lat;
    const unitLng = unit?.lng;




    useEffect(() => {
        // dispatch(getRentalUnits())
        dispatch(getSingleUnit(id))

    }, [dispatch,id])


    const handleReviewDelete = async (e) => {
        // e.preventDefault();
        //* Need to fix the id that is being brough in
        /*
        * I can pass in the single reviews into their own componenet to be able to render the delete button
            - inside the Review componenet I can grab the single id of the review and then use a useEffect on the Unit Page to have a data refresh when the reviews are updated
        */
        dispatch(deleteReview(id));
        dispatch(getRentalUnits())
        alert("Review Delete");
        return "Review has been Deleted";
    }


    const unitId = unit?.id

    //* Edit Unit route Id is coming up as undefined might need to pass in a prop

    const bookOrEditUnit = () => {
        if (userId > 0 && userId === unit?.ownerId) {
            return (
                <>
                    <div>
                    <EditUnitModal/>
                    </div>

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

//* Reviews / button functionality

    const displayReviews = () => {
        return unitReviews?.map((review) => {
            return (
                <>
                    <div id="review-row" class="text-black grid grid-cols-2">
                        <div id="review-username" class="text-center">
                            <p>{review.username}</p>
                        </div>
                        <div id="review-comment" class="text-center">
                            {editReview(review)}
                        </div>
                    </div>
                </>

            )
        })

    };


    //* need to pass in the review.id into the EditReviewModal form so I can be able to access the specified ID
    //* and set that ID inside my getReview() thunk then this will be able to grab the specified ID

    const editReview = (review) => {
        if (userId === review.userId) {
            return (
                <div class="flex justify-center">
                    <p class="pl-3 relattive left-2">{review.comment}</p>
                    <div class='relative left-3'>
                        {/* <a href={`/reviews/${review.id}/edit`}><button>Edit</button></a> */}
                        <EditReviewModal reviewId={review.id}/>

                        {/* Delete Route is recieving an undefined ID so the review ID isn't being touched */}
                        {/* <button class='relative left-4' onClick={handleReviewDelete}>Delete</button> */}
                    </div>

                </div>
            )
        } else {
            return (
                <p>{review.comment}</p>
            )
        }
    };



    //* Bookings / button functionality

      const displayBookings = () => {
        return unitBookings?.map((booking) => {
            return (
                <>
                    <div id="review-row" class="text-black grid grid-cols-2">
                    {/* <div id="review-row" class="text-black "> */}


                        <div id="review-username" class="text-center ">
                            <p>{booking.startDate}</p>
                        </div>
                        <div id="review-comment" class="text-center">
                            {editBooking(booking)}
                        </div>
                    </div>
                </>

            )
        })

    }


    const editBooking = (booking) => {
        if (userId === booking.userId) {
            return (
                <div class="flex justify-center">
                       <div class='flex flex-row '>
                            {/* <p key={booking.id} id="start-date">{booking.starDate}</p> */}
                             <p key={booking.id} id="end-date">{booking.endDate}</p>
                            </div>

                        {/* Buttons */}
                    <div class='relative left-3'>
                        {/* <a href={`/bookings/${booking.id}/edit`}><button>Edit</button>
                        </a> */}
                        <EditBookingModal />
                        {/* <button class='relative left-4' onClick={handleBookingDelete(booking.id)}>Delete</button> */}
                    </div>
                </div>
            )
        } else {
            return (
                <div >
                <p key={booking.id}>{booking.endDate}</p>
                {/* <p>Start-date</p> */}
                </div>
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
                            {bookOrEditUnit()}
                        </>
                    </div>
                </div>


                {/* Google Maps goes here */}



            </div>

            <div class=' w-full bg-gray-200 h-full mt-3 flex flex-col justify-center items-center '>
                {/* <h1>Google Maps</h1> */}


                {/* pass in the unit.lat & unit.lng */}
                <MapContainer lat={unitLat} lng={unitLng} />
            </div>

            {/* Reviews will be a grid */}
            <div class=' w-full bg-gray-200 h-60 mt-3 overflow-scroll p-10 mb-6'>
                <div class='overflow-scroll'>
                    <h1 class='text-center text-3xl font-medium relative bottom-4 pt-3 '>Reviews </h1>

                    <div class='text-center pt-3 pb-4'>
                        {/* <button ><a href={`/${unit?.id}/reviews/new`}>Leave a Review</a></button> */}
                        <NewReviewModal />
                        {/* <button ><a href='/'>Leave a Review</a></button> */}
                    </div>
                    <div class='flex justify-around'>
                        <p class='underline font-medium text-xl '>Username </p>
                        <p class='underline font-medium text-xl '>Comment </p>
                    </div>

                    {displayReviews()}

                </div>
            </div>

{/* need to pass in the calendar props */}

            <div class='pb-20'>
                <BookingCal  userId={userId} unitId={unit?.id}/>
            </div>

                 {/* Bookings will be a grid */}
                 <div class=' w-full bg-gray-200 h-60 mt-3 overflow-scroll p-10 mb-6'>
                <div class='overflow-scroll'>

                    <div class='flex justify-evenly'>
                        <p class='underline font-medium text-xl '>Start Date </p>
                        <p class='underline font-medium text-xl '>End Date </p>
                    </div>

                    {displayBookings()}

                </div>
            </div>



            {/* End of Container */}
        </div>


    )

}



// * items-center : will vertically center items

export default GetSingleUnitPage;
