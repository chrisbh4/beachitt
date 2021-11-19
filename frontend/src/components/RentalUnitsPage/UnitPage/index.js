import React , {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getRentalUnits, getSingleUnit } from '../../../store/rentalUnits';

function GetRentalUnitPage (){
    const dispatch = useDispatch();
    const {id} = useParams();
    const unit = useSelector(state => state.rentalUnit[id])
    console.log(unit)

    useEffect(()=>{
        dispatch(getRentalUnits())
        dispatch(getSingleUnit())
    },[dispatch])

    return (
        <div >
            <h2>{unit?.title}</h2>

        <div className="unit-details" >
            <h4>Unit Description:</h4>
                <p>Location: {unit?.city}, {unit?.state}, {unit?.zipcode} </p>
                <p>Distance From Beach: {unit?.distanceFromBeach} miles </p>
                <p>Price:$ {unit?.price} /per night</p>
                <p>Number of Rooms:{unit?.rooms} </p>
                <p>Number of Bathrooms:{unit?.bathrooms} </p>
                <p>{unit?.rentalUnitDescription}</p>
            </div>

            <div>
                <button>Book</button>
                <button>Go Back</button>
            </div>
            {/* End of Container */}
        </div>

    )

}


export default GetRentalUnitPage;
