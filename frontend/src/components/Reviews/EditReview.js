import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import { editRentalUnit } from "../../store/rentalUnits"



function EditReviewForm() {
    const dispatch = useDispatch();
    // const history = useHistory();



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
