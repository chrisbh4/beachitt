import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {getSingleUnit } from '../../../store/rentalUnits';
import MapContainer from '../../Maps';
import BookingCal from '../../Booking-Cal';
import EditUnitModal from '../../Modals/Units/EditModal';
import NewReviewModal from "../../Modals/Reviews/NewModal.js"
import EditReviewModal from '../../Modals/Reviews/EditModal';
import EditBookingModal from '../../Modals/Bookings/EditModal';


function GetSingleUnitPage() {
    const dispatch = useDispatch();
    const {id} = useParams();

    const unit = useSelector(state => state?.rentalUnit)
    const userId = useSelector(state => state?.session.user.id)
    const unitReviews = unit?.Reviews;
    const unitBookings = unit?.Bookings;



    const unitLat = unit?.lat;
    const unitLng = unit?.lng;

    /*
    I need the post/put to log to the state and allow the new State to utitlize the useEffect and refresh its newly updated data
     I can update the reviews using useState and UseEffect
        1. const [unitReviews, setUnitReviews] = ([unit?.Reviews])
            - saves the currently fetched review data
        2. inside the useEffect place setUnitReviews(unit?.Reviews)
            - updates the reviews vairable if there is new data parsed to the react state

        * See if I can call on the dispatch from the store which will run it in order hopefully lol

            2 choices

            1. Find a way to have the dispatches go in order how i want them too

            2. Rebuild how the reviews and bookings are being rendered
                -GET 'api/reviews/unit/:id/review: filter through all reviews that belong to the rental unit ( Unit.id )
                    - findAll({where:{rentalUnitId:req.params.id}})
                        - finds all reviews that have the same rentalUnitId as the paramaters
                -POST/PUT/DELETE work perfectly find
    */

    // updates page when the single Unit has new data
    useEffect(() => {
        dispatch(getSingleUnit(id))

    }, [dispatch, id])


    // const handleReviewDelete = async (e) => {
    //     // e.preventDefault();
    //     //* Need to fix the id that is being brough in
    //     /*
    //     * I can pass in the single reviews into their own componenet to be able to render the delete button
    //         - inside the Review componenet I can grab the single id of the review and then use a useEffect on the Unit Page to have a data refresh when the reviews are updated
    //     */
    //     dispatch(deleteReview(id));
    //     dispatch(getRentalUnits())
    //     alert("Review Delete");
    //     return "Review has been Deleted";
    // }



    const bookOrEditUnit = () => {
        if (userId > 0 && userId === unit?.ownerId) {
            return (
                <>
                    <div>
                        <EditUnitModal />
                    </div>

                </>
            )
        } else {
            // create bookings functionality
            return (
                // <button ><a href={`/bookings`}>Book a trip</a></button>
                <>
                    <button
                        class=" "
                    ><a href={'#booking'}>Book a trip</a></button>
                </>
            )
        }
    }

    //* Reviews / button functionality

    const displayReviews = () => {
        return unitReviews?.map((review) => {
            return (
                <>
                {/* pos:rel right:30px */}
                    <div id="review-row" class="text-black grid grid-cols-2 py-3 ">
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
                        <EditReviewModal reviewId={review.id} />
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





    const displayBookings = () => {
        return unitBookings?.map((booking) => {
            const splitStartDate = booking.startDate.split('-')
            const startDate = `${splitStartDate[1]} / ${splitStartDate[2]} / ${splitStartDate[0]}`


            return (
                <>
                    <div id="bookedDates-row" class="text-black grid grid-cols-2 py-3">
                        <div id="booking-start" class="text-center ">
                            <p>{startDate}</p>
                        </div>
                        <div id="edit-booking-end" class="text-center">
                            {editBooking(booking)}
                        </div>
                    </div>
                </>

            )
        })

    };


    const editBooking = (booking) => {
        if (userId === booking.userId) {
            const splitEndDate = booking.endDate.split('-')
            const endDate = `${splitEndDate[1]} / ${splitEndDate[2]} / ${splitEndDate[0]}`
            return (
                <div class="flex  ">
                    <div class='flex flex-row '>
                        {/* <p key={booking.id} id="start-date">{booking.starDate}</p> */}
                        <p key={booking.id} id="end-date">{endDate}</p>
                    </div>

                    {/* Buttons */}
                    <div id='edit-booking-button'>
                        <EditBookingModal bookingId={booking.id} unitBookings={unitBookings} />
                    </div>
                </div>
            )
        } else {
            const splitEndDate = booking.endDate.split('-')
            const endDate = `${splitEndDate[1]} / ${splitEndDate[2]} / ${splitEndDate[0]}`
            return (

                <div >
                    <p id="booking-end" key={booking.id}>{endDate}</p>
                    {/* <p>Start-date</p> */}
                </div>
            )
        }
    }


    return (

        <div id="unit-grid-container"  >
{/* Row-1 */}
            <div id='row-1' class='  justify-center flex pt-5 '  >
                <div id='unit-detail-image' class='w-6/12 '>
                    <img class=' h-full  w-full  ' src={`${unit?.url}`} alt={unit?.title} ></img>
                </div>

                <div id='blanch-bg' class='  w-4/12  flex flex-col  p-12  overflow-y-auto ' >
                    <div class='relative top-10 '>
                        <h2 class='text-center text-3xl pb-4 '>{unit?.title}</h2>
                        <div className="unit-details" class='text-center ' >
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
                        <button> <Link to='/units'>Go Back</Link> </button>
                        <>
                            {bookOrEditUnit()}
                        </>
                    </div>
                </div>
            </div>
{/* Row-2 */}
            <div id='row-2' class=' w-full flex justify-center '>
                <div id='blanch-bg' class=' w-6/12 h-full mt-3 flex flex-col justify-center items-center   '>
                    <MapContainer lat={unitLat} lng={unitLng} id='map-container'  />
                </div>
                <div id='reviews-cont-height'  class=' w-4/12 bg-gray-200 h-60 mt-3 overflow-y-auto p-10  '>
                    <div>
                        <h1 class='text-center text-3xl font-medium relative bottom-4 pt-3 '>Reviews </h1>

                        <div class='text-center pt-3 pb-4'>

                            <NewReviewModal />
                        </div>
                        <div class='flex justify-around'>
                            <p class='underline font-medium text-xl ' id='reviews-username-title' >Username </p>
                            <p class='underline font-medium text-xl' id='reviews-comment-title' >Comment </p>
                        </div>

                        {displayReviews()}

                    </div>
                </div>
            </div>

{/* Row-3 */}
            <div id='row-3' class='flex justify-center  pb-4 '>

                <div class='w-6/12 bg-gray-200 '  id="calendar-display">

                    <BookingCal userId={userId} unitId={unit?.id} unitBookings={unit.Bookings} />
                </div>

                <div id='booking-dates-display' class=' w-4/12 bg-gray-200     p-10 mb-6 overflow-y-auto'>
                    <div>
                        <div class='flex justify-evenly' id='booking-titles'>
                            <p class='underline font-medium text-xl '>Start Date </p>
                            <p class='underline font-medium text-xl' id='end-date-title'>End Date </p>
                        </div>
                        {displayBookings()}
                    </div>
                </div>

            </div>


            {/* End of Container */}
        </div>


    )

}

export default GetSingleUnitPage;
