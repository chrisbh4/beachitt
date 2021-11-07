import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {createRentalUnit, createImage} from "../../store/rentalUnits"

import '../RentalUnitsPage/NewUnit.css'


function NewUnitForm() {
    const dispatch = useDispatch();
    const history = useHistory()
    const sessionUserId = useSelector(state => state.session.user.id);

    const [title, setTitle] = useState("")
    const [city, setCity] = useState("")
    const [distanceFromBeach, setDistanceFromBeach] = useState("")
    const [image, setImage] = useState("")
    const [lat, setLat] = useState("")
    const [lng, setLng] = useState("")
    const [price, setPrice] = useState("")
    const [pool, setPool] = useState("")
    const [rentalUnitDescription, setRentalUnitDescription] = useState("")
    const [bathrooms, setBathrooms] = useState(1)
    const [unitType, setUnitType] = useState("")
    const [rooms, setRooms] = useState(1)
    const [state, setState] = useState("")
    const [zipcode, setZipcode] = useState("")
    // const [totalRentals] = useState(0)
    // const [] = useState("")
    const ownerId = sessionUserId;
/*
    to grab the current user and be able to set values to other variables
*/



    const updateTitle = (e) => setTitle(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateDistanceFromBeach = (e) => setDistanceFromBeach(e.target.value);
    const updateImage = (e) => setImage(e.target.value);
    const updateLat = (e) => setLat(e.target.value);
    const updateLng = (e) => setLng(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);
    const updatePool = (e) => setPool(e.target.value);
    const updateRentalUnitDescription = (e) => setRentalUnitDescription(e.target.value);
    const updateBathrooms = (e) => setBathrooms(e.target.value);
    // need a unitType for a drowdown
    const updateUnityType = (e) => setUnitType(e.target.value);
    const updateRooms = (e) => setRooms(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateZipcode = (e) => setZipcode(e.target.value);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title,
            ownerId,
            city,
            state,
            zipcode,
            distanceFromBeach,
            rooms,
            bathrooms,
            pool,
            unitType,
            lat,
            lng,
            price,
            rentalUnitDescription,
            totalRentals: 0
        };

        const imagePayload = {
            image
        };

        const newImage = dispatch(createImage(imagePayload))
        // let newUnit = dispatch(createRentalUnit(payload));
        // if(newUnit){
        //     return newUnit
        // }
      const unit =  dispatch(createRentalUnit(payload));
        // reset();
        if(unit && newImage){
            history.push("/units")
            throw alert("Rental Unit Submited")
        }

    }

    // const reset = () => {
	// 	    setTitle("")
    //         setCity("")
    //         setState("")
    //         setZipcode("")
    //         setDistanceFromBeach("")
    //         setRooms("")
    //         setBathrooms("")
    //         setPool("")
    //         setUnitType("")
    //         setLat("")
    //         setLng("")
    //         setPrice("")
    //         setRentalUnitDescription("")

	// };

    return (
        <div className="form-placement">
            <h2 className="form-title">New Rental Unit Form</h2>
            <div className="newUnitForm-container">
                <form
                    className="new-form"
                    onSubmit={handleSubmit}
                >
                <div className="titel-input">
                    <label>Title: </label>
                    <input
                        type="text"
                        onChange={updateTitle}
                        // value={title}
                        value={"Test unit for images"}
                        ></input>
                        </div>
                    <div className="address-container">
                        <label>City: </label>
                        <input
                            type="text"
                            onChange={updateCity}
                            // value={city}
                            value={"djfsdjfskdfj"}
                        ></input>
                        <label>State: </label>
                        <input
                            type="text"
                            onChange={updateState}
                            // value={state}
                            value={"djfsdjfskdfj"}
                        ></input>
                        <label>Zipcode: </label>
                        <input
                            type="text"
                            onChange={updateZipcode}
                            // value={zipcode}
                            value={"djfsdjfskdfj"}
                        ></input>
                    </div>
                    <h3>Unit Details & Descriptions</h3>
                    <label> Distance From The Beach (in miles): </label>
                    <input
                        type="number"
                        onChange={updateDistanceFromBeach}
                        // value={distanceFromBeach}
                        value={"1"}
                    ></input>
                    <label>Rooms: </label>
                    <input
                        type="number"
                        onChange={updateRooms}
                        // value={rooms}
                        value={"1"}
                        min="1"
                    ></input>
                    <label>Bathrooms: </label>
                    <input
                        type="number"
                        onChange={updateBathrooms}
                        // value={bathrooms}
                        value={"1"}
                    ></input>
                    <label>Pool (yes or no): </label>
                    <input
                        type="text"
                        onChange={updatePool}
                        // value={pool}
                        value={"djfsdjfskdfj"}
                        max="3"
                    ></input>
                <div className="unit-type">

                <label htmlFor="house">House</label>
					<input
						onChange={updateUnityType}
						// value={"house"}
                        value={"djfsdjfskdfj"}
						type="radio"
                        id="hosue"
                        checked={unitType === 'house'}
						// id="house"
                        >
                    </input>
                <label htmlFor="apartment">Apartment</label>
					<input
						onChange={updateUnityType}
						// value={"apartment"}
                        value={"djfsdjfskdfj"}
						type="radio"
                        id="apartment"
                        checked={unitType === 'apartment'}
                        // disabled={unitType === "apartment"}

						// id="house"
                        >
                    </input>
                <label htmlFor="singleRoom">Single Room</label>
					<input

						onChange={updateUnityType}
                        checked={unitType === 'single room'}
						// value={"single room"}
                        value={"djfsdjfskdfj"}
						type="radio"
						id="singleRoom"
                        >
                    </input>
                        </div>
                    <label>Latitude: </label>
                    <input
                        type="text"
                        // value={lat}
                        value={"123456"}
                        onChange={updateLat}
                    ></input>
                    <label>Longitude: </label>
                    <input
                        type="text"
                        // value={lng}
                        value={"123456"}
                        onChange={updateLng}
                    ></input>
                    <label>Price Per Night: $ </label>
                    <input
                        type="text"
                        // value={price}
                        value={"1234"}
                        onChange={updatePrice}
                    ></input>
                    <label>Price Per Night: $ </label>
                    <input
                        type="file"
                        value={image}
                        onChange={updateImage}
                    ></input>
                    <label>Unit Description: </label>
                    <textarea
                        onChange={updateRentalUnitDescription}
                        // value={rentalUnitDescription}
                        value={"djfsdjfskdfj"}
                    ></textarea>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}


export default NewUnitForm;
