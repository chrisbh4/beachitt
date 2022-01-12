import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { getReview, editReview, deleteReview } from '../../store/reviews';
import {getSingleUnit} from "../../store/rentalUnits"



function EditReviewForm({id}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const review = useSelector((state)=> state.reviews)
    // const {id} = useParams();

// * store thunk is not grabbing the single review
    useEffect(()=>{
        dispatch(getReview(id))
    },[dispatch,id])





    //* change useState to hold current Review that was selected
    const [comment, setComment] = useState(review.comment);
    const [rentalUnitId] = useState(review.rentalUnitId);
    const [userId] = useState(review.userId);
    const [username] = useState(review.username);

    console.log('--------')
    console.log(rentalUnitId)


    const updateComment = ((e)=> setComment(e.target.value))


    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            comment,
            rentalUnitId,
            userId,
            username
        };

        const data = await dispatch(editReview(payload,id));

        if (data.errors) return data.errors;

        dispatch(getSingleUnit(rentalUnitId))
        alert("Review has been submited.")
        // history.push(`/units/${review.rentalUnitId}`)
        return data;
    };

    const handleDelete = async (e)=>{
        e.preventDefault();

        dispatch(deleteReview(id));
        dispatch(getSingleUnit(rentalUnitId))
        return {msg:"Review has been deleted"}
        // alert("Review Delete");
        // history.push(`/units/${review.rentalUnitId}`)
    }


    return (
        <div>
            <h1>Edit Review Form</h1>
            <form
                onSubmit={handleSubmit}>
                    <label>Comment</label>
                    <input
                    type='text'
                    onChange={updateComment}
                    placeholder={review.comment}
                    >
                    </input>

                    {/* maybe place button outside of form for styling */}
                    <button type='submit'>Submit</button>
                    <button onClick={handleDelete}>Delete</button>

                </form>

        </div>
    )
}


export default EditReviewForm
