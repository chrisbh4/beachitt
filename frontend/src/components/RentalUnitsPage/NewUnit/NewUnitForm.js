import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRentalUnit} from "../../../store/rentalUnits"
import "../../RentalUnitsPage/NewUnit/NewUnit.css"



function NewUnitForm({submitModal}) {
    const dispatch = useDispatch();
    const ownerId = useSelector(state => state.session.user.id);

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
    const [errors, setErrors] = useState([]);

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
    const updateUnityType = (e) => setUnitType(e.target.value);
    const updateRooms = (e) => setRooms(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateZipcode = (e) => setZipcode(e.target.value);


    const handleSubmit = async (e) => {
        e.preventDefault();
        //* Could delete this: check later on
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

        const data = await dispatch(createRentalUnit(payload));

        if (data.errors) {
            setErrors(data.errors)
            return data.errors
        }
        else {
            submitModal(false)
            return data
        };
    };


    return(
        <div className="form-placement"    >
            <h2 className="form-title">New Rental Unit Form</h2>
            <div className="newUnitForm-container" >
                <form
                    className="new-form"
                    onSubmit={handleSubmit}
                >
                    <div className="new-unit-errors" hidden={!errors.length} >
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
                            class='w-2/12 mr-2'
                            type="text"
                            onChange={updateState}
                            value={state}
                            ></input>

                        <label>Zipcode: </label>
                        <input
                         class='w-2/12 '
                            type="text"
                            onChange={updateZipcode}
                            value={zipcode}
                        ></input>
                    </div>
                    <h3 class='border-b-2 border-black pt-3 text-center text-lg' >Unit Details & Descriptions</h3>
                    <label> Distance From The Beach (in miles): </label>
                    <input
                    //  class='w-2/12 '
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
                    <div className="">
                        <div class='pb-1 pt-2'>
                            <label >Pool: </label>
                        </div>
                        <input
                            onChange={updatePool}
                            value="yes"
                            type="radio"
                            id="pool-yes"
                            checked={pool === 'yes'}
                        >
                        </input>
                        <label htmlFor="pool-yes" class='pr-2'>Yes</label>

                        <input
                            onChange={updatePool}
                            value="no"
                            type="radio"
                            id="pool-no"
                            checked={pool === 'no'}
                        >
                        </input>
                        <label htmlFor="pool-no" class='pr-2'>No</label>
                    </div>
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
                      class='p-1'
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
