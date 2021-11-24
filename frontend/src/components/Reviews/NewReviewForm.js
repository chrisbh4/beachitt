import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {  useParams } from 'react-router-dom';
import { createReview } from '../../store/reviews';
import "../Reviews/Reviews.css"



function NewReviewForm (){
    const dispatch = useDispatch();
    // const history = useHistory();
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

        const data = dispatch(createReview(payload));

        if(data.errors) return data.errors;
        return data;
    };




//React JSX
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
                </form>
            </div>
        </div>
    )

}


export default NewReviewForm
