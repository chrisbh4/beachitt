import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {  useParams, useHistory } from 'react-router-dom';
import { createReview } from '../../store/reviews';
import {getSingleUnit } from "../../store/rentalUnits"
import "../Reviews/Reviews.css"



function NewReviewForm (){
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();

    const userId = useSelector((state)=> state.session.user.id)
    const username = useSelector((state)=> state.session.user.username)
    const [comment , setComment] = useState("");

    const updateComment = (e) => setComment(e.target.value);


    const handleSubmit = async (e) =>{
        e.preventDefault();

        const payload ={
            comment,
            rentalUnitId:id,
            userId,
            username
        };

        // const res =
        const data = dispatch(createReview(payload));

        if(!data.errors){
            dispatch(getSingleUnit(id))
            return data
        }else{
            return data.errors
        }
    };

    return (
        <div>
            <h1 class='text-center'>Leave a review</h1>

            <div>
                <form
                    onSubmit={handleSubmit}>

                    <label>Comment:</label>
                    <input
                        type="text"
                        onChange={updateComment}
                    ></input>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )

}


export default NewReviewForm
