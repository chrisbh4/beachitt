import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {createRentalUnit} from "../../store/rentalUnits"



function NewUnitForm() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("")
    const [city, setCity] = useState("")
    const [distanceFromBeach, setDistanceFromBeach] = useState("")
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
    const [totalRentals] = useState(0)
    const [] = useState("")

/*
    const sessionUser = useSelector(state => state.session.user);
    to grab the current user and be able to set values to other variables
*/



    const updateTitle = (e) => setTitle(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateDistanceFromBeach = (e) => setDistanceFromBeach(e.target.value);
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
            totalRentals
        };

        let newUnit = dispatch(createRentalUnit(payload));

        if(newUnit){
            return newUnit
        }

    }

    return (
        <div>
            <h2>New Rental Unit Form</h2>
            <div className="newUnitForm-container">
                <form
                    onSubmit={handleSubmit}
                >
                    <label>Title: </label>
                    <input
                        type="text"
                        onChange={updateTitle}
                        value={title}
                    ></input>
                    <div className="address-container">
                        <label>City: </label>
                        <input
                            type="text"
                            onChange={updateCity}
                            value={city}
                        ></input>
                        <label>State: </label>
                        <input
                            type="text"
                            onChange={updateState}
                            value={state}
                        ></input>
                        <label>Zipcode: </label>
                        <input
                            type="text"
                            onChange={updateZipcode}
                            value={zipcode}
                        ></input>
                    </div>
                    <h3>Unit Details & Descriptions</h3>
                    <label> Distance From The Beach (in miles): </label>
                    <input
                        type="number"
                        onChange={updateDistanceFromBeach}
                        value={distanceFromBeach}
                    ></input>
                    <label>Rooms: </label>
                    <input
                        type="number"
                        onChange={updateRooms}
                        value={rooms}
                        min="1"
                    ></input>
                    <label>Bathrooms: </label>
                    <input
                        type="number"
                        onChange={updateBathrooms}
                        value={bathrooms}
                    ></input>
                    <label>Pool (yes or no): </label>
                    <input
                        type="text"
                        onChange={updatePool}
                        value={pool}
                        max="3"
                    ></input>
                    {/* <select name="unitType"
                            value={unitType}
                    >
                        <option onChange={unitType}>
                            House
                        </option>
                        <option onChange={unitType}>
                            Apartment
                        </option>
                        <option onChange={unitType} >
                            Single Room
                        </option>
                    </select> */}
                    {/* <input
                        type="radio"
                        value={"house"}
                        onClick={updateUnityType}>
                            House
                    </input>
                    <input
                        type="radio"
                        value={"apartment"}
                        onClick={updateUnityType}>
                            Apartment
                    </input>
                    <input
                        type="radio"
                        value={"single room"}
                        onClick={updateUnityType}>
                            Single Room
                    </input> */}
                    <label>Latitude: </label>
                    <input
                        type="text"
                        value={lat}
                        onChange={updateLat}
                    ></input>
                    <label>Longitude: </label>
                    <input
                        type="text"
                        value={lng}
                        onChange={updateLng}
                    ></input>
                    <label>Price Per Night: $ </label>
                    <input
                        type="text"
                        value={price}
                        onChange={updatePrice}
                    ></input>
                    <label>Unit Description: </label>
                    <textarea
                        onChange={updateRentalUnitDescription}
                        value={rentalUnitDescription}
                    ></textarea>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}


export default NewUnitForm
