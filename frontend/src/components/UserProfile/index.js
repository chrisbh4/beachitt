import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { fetchUserProfile } from "../../store/profile"




function UserProfile() {
    const { id } = useParams()
    const dispatch = useDispatch();
    const user = useSelector((state) => state.profile)

    useEffect(() => {
        dispatch(fetchUserProfile(id))
    }, [id])

    console.log(user)

    // const grabUnitImage = (id) =>{
    //     //* I can either fetch singleUnit from react state or make backend call for the unit
    //     const unitFetch = await `url/${id}`
    //     const {url} = unitFetch

    //     return(<>
    //         <img src={url} />
    //     </>)
    // }

    const displayUserBookings = user.Bookings?.map((booking) => {
        // * Can make a function to fetch for the rentalUnit's Image by grabbing its rentalUnitId from bookings{}
        return (<>
            <div>
                <div class="flex w-1/2">
                    <p>Start Date :</p>
                    <p>{booking.startDate}</p>
                </div>
                <div class="flex border-b-2 border-black w-1/4">
                    <p>End Date :</p>
                    <p>{booking.endDate}</p>
                </div>
            </div>
        </>)
    })

    const displayUserReviews = user.Reviews?.map((review) => {
        return (<>
            <div class="">
                <div class="">
                    <p>rental unit ID : {review.rentalUnitId}</p>
                    <p>{review.comment}</p>

                </div>
            </div>
        </>)
    })

    const displayUserRentalUnits = user.RentalUnits?.map((rentalUnit) => {
        return (<>
            <div class="">
                <div>
                    {/* <img src={rentalUnit.url} /> */}
                    <p>{rentalUnit.title}</p>
                    <p>{rentalUnit.price}</p>
                </div>
            </div>
        </>)
    })


    return (
        <div class='w-3/4' flex justify-center>
            <div>
            <h1 class='text-xl text-white'>User Detials</h1>
            <p>{user.id}</p>
            <p>{user.username}</p>
            <p>Total Listed Units: {user.RentalUnits?.length}</p>
            <p>Total Reviews : {user.Reviews?.length}</p>
            <p>Total Booked Trips : {user.Bookings?.length}</p>
            </div>

            <h1 class='text-xl text-white'>Owned Units</h1>
            {displayUserRentalUnits}

            <h1 class='text-xl text-white'>Submited Reviews</h1>
            {displayUserReviews}

            <h1 class='text-xl text-white'>Booked Trips</h1>
            {displayUserBookings}

        </div>
    )
}

export default UserProfile
