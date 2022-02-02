import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {  useParams } from 'react-router-dom';
import { createReview } from '../../store/reviews';
import {getSingleUnit } from "../../store/rentalUnits"
import "../Reviews/Reviews.css"



function NewReviewForm ({submitModal}){
    const dispatch = useDispatch();
    const {id} = useParams();

    const userId = useSelector((state)=> state.session.user.id)
    const username = useSelector((state)=> state.session.user.username)
    const [comment , setComment] = useState("");
    const [errors , setErrors] = useState([]);

    const updateComment = (e) => setComment(e.target.value);




    const handleSubmit = async (e) =>{
        e.preventDefault();

        const payload ={
            comment,
            rentalUnitId:id,
            userId,
            username
        };

        const data = await dispatch(createReview(payload));

        if(!data.errors){
            dispatch(getSingleUnit(id))
            submitModal(false)
            return data
        }else{

            //* This allows me to access the Errors array
            // const test ="this added to the array";
            // data.errors.push(test);
            // console.log(data.errors);

            setErrors(data.errors);
            return data
        };
    };

    return (
        <div class='p-10 bg-yellow-200'>
            <h1 class='text-center text-2xl'>Leave a review</h1>

            <div>
                <form
                    onSubmit={handleSubmit}>
                            <div className="new-review-errors"  hidden={!errors.length} >
                        {
                            errors.map((error) => {
                                if (error) {
                                    return (
                                        <p key={error.id}>{error}</p>
                                    )
                                }
                                return null;
                            })
                        }
                    </div>
                    <label class='mr-1.5'>Comment:</label>
                    <textarea
                        class='border border-black mr-2 relative top-4'
                        type="text"
                        onChange={updateComment}
                    ></textarea>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )

}


export default NewReviewForm
