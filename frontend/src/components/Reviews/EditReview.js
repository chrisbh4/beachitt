import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReview, editReview, deleteReview } from '../../store/reviews';
import {getSingleUnit} from "../../store/rentalUnits"



function EditReviewForm({id, submitModal}) {
    const dispatch = useDispatch();
    const review = useSelector((state)=> state.reviews)

    useEffect(()=>{
        dispatch(getReview(id))
    },[dispatch,id])


    //* change useState to hold current Review that was selected
    const [comment, setComment] = useState(review.comment);
    const [rentalUnitId] = useState(review.rentalUnitId);
    const [userId] = useState(review.userId);
    const [username] = useState(review.username);
    const [errors , setErrors] = useState([]);

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

        if (data.errors){
            setErrors(data.errors);
            return data
        };

        dispatch(getSingleUnit(rentalUnitId))
        submitModal(false);
        return data;

    };



    // Need to either have singleUnit dispatch after the delete to be able to have the correct updated data
    // or
    //* Have the the review be removed from the Unit's store so the useEffect will take place and have to update the Unit's state
        //* Missing piece is somewhere in the store/Units - DELETE_REVIEW case:
        //? maybe use a .then to try and wait for the deleteFunction to finish before the getSingleUnit fetch starts



    const handleDelete = async (e)=>{
        e.preventDefault();

        await dispatch(deleteReview(id));
        dispatch(getSingleUnit(rentalUnitId));
        submitModal(false)
        return {msg:"Review has been deleted from the rental"}
    }


    return (
        <div class='p-10 bg-yellow-200'>
            <h1 class='text-center'>Edit Review Form</h1>
            <form
                onSubmit={handleSubmit}
            >
                <div className="edit-review-errors"  hidden={!errors.length} >
                        {
                            errors.map((error) => {
                                if (error) {
                                    return (
                                        <p class='text-center' key={error.id}>{error}</p>
                                    )
                                }
                                return null;
                            })
                        }
                    </div>
                    <label>Comment:</label>
                    <textarea
                        class='border border-black ml-2 mr-2 relative top-4'
                        type='text'
                        onChange={updateComment}
                        placeholder={review.comment}
                    >
                    </textarea>
                    {/* maybe place button outside of form for styling */}
                    <button class='mr-2.5  ml-1' type='submit'>Submit</button>
                    <button onClick={handleDelete}>Delete</button>

                </form>

        </div>
    )
}


export default EditReviewForm
