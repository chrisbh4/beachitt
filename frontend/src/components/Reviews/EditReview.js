import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
// import { useHistory } from 'react-router-dom';
import { editRentalUnit } from "../../store/rentalUnits"
import { getReview } from '../../store/reviews';



function EditReviewForm() {
    const dispatch = useDispatch();
    const review = useSelector((state)=> state.reviews)
    console.log('------')
    console.log(review)


    // const history = useHistory();
    const {id} = useParams();



// * store thunk is not grabbing the single review 
    useEffect(()=>{
        debugger
        dispatch(getReview(id))
        debugger
    },[dispatch])




    //* change useState to hold current Review that was selected
    const comment = useState("");
    const rentalUnitId = useState("");
    const userId = useState("");
    const username = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            comment,
            rentalUnitId,
            userId,
            username
        };

        const data = await dispatch(editRentalUnit(payload));
        if (data.errors) return data.errors;

        return data;
    };


    return (
        <div>
            <h1>Edit Review Form</h1>
            <form
                onSubmit={handleSubmit}>
                    <label>Comment</label>
                    <input
                    type='text'
                    // placeholder={}
                    >
                    </input>
                </form>
        </div>
    )
}


export default EditReviewForm
