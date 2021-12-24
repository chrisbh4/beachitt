import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createRentalUnit , getRentalUnits } from "../../../store/rentalUnits"
import "../../RentalUnitsPage/NewUnit/NewUnit.css"

// import '../RentalUnitsPage/NewUnit.css'


function NewUnitForm() {
    const dispatch = useDispatch();
    const history = useHistory()
    const sessionUserId = useSelector(state => state.session.user.id);

    const [title, setTitle] = useState("")
    const [city, setCity] = useState("")
    const [distanceFromBeach, setDistanceFromBeach] = useState("")
    const [url, setUrl] = useState("")
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
    const updateUrl = (e) => setUrl(e.target.files[0]);
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
        const totalRentals = 0;

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
            totalRentals,
            url
        };



        const unit = dispatch(createRentalUnit(payload));

        if (unit) {
            // history.push("/units");
            alert("Rental Unit Submited");
            return unit
        }

    }

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
                            value={title}
                        ></input>
                    </div>
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
                    <label>Pool : </label>
                    <input
                        type="text"
                        onChange={updatePool}
                        value={pool}
                        max="3"
                    ></input>
                    <div className="unit-type">

                        <div class='pb-1 pt-2'>
                            <label >Unity Type: </label>
                        </div>


                        <input
                            onChange={updateUnityType}
                            value="house"
                            type="radio"
                            id="hosue"
                            checked={unitType === 'house'}
                        // id="house"
                        >
                        </input>
                        <label htmlFor="house" class='pr-2'>House</label>
                        <input
                            onChange={updateUnityType}
                            value="apartment"
                            type="radio"
                            id="apartment"
                            checked={unitType === 'apartment'}
                        >
                        </input>
                        <label htmlFor="apartment" class='pr-2'>Apartment</label>
                        <input

                            onChange={updateUnityType}
                            checked={unitType === 'single room'}
                            value={"single room"}
                            type="radio"
                            id="singleRoom"
                        >
                        </input>
                        <label htmlFor="singleRoom" class='pr-2'>Single Room</label>
                    </div>
                    <label class='pt-2'>Latitude: </label>
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
                    <label>Image : </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={updateUrl}
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


export default NewUnitForm;
