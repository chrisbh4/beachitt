import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editRentalUnit, deleteRentalUnit, getSingleUnit } from "../../../store/rentalUnits";
import './EditRentalUnit.css'


/*
      * Optimization notes
        - Have modal close on all form submissions
      */

function EditUnitForm({submitModal}) {

    const { id } = useParams();
    const dispatch = useDispatch()
    const history = useHistory()

    const rentalUnit = useSelector((state) => (state.rentalUnit))


    useEffect(() => {
        dispatch(getSingleUnit(id))

    }, [dispatch, id])

    const [title, setTitle] = useState(rentalUnit.title)
    const [city, setCity] = useState(rentalUnit.city)
    const [distanceFromBeach, setDistanceFromBeach] = useState(rentalUnit.distanceFromBeach)
    const [lat, setLat] = useState(rentalUnit.lat)
    const [lng, setLng] = useState(rentalUnit.lng)
    const [price, setPrice] = useState(rentalUnit.price)
    const [pool, setPool] = useState(rentalUnit.pool)
    const [rentalUnitDescription, setRentalUnitDescription] = useState(rentalUnit.rentalUnitDescription)
    const [bathrooms, setBathrooms] = useState(rentalUnit.bathrooms)
    const [unitType, setUnitType] = useState(rentalUnit.unitType)
    const [rooms, setRooms] = useState(rentalUnit.rooms)
    const [state, setState] = useState(rentalUnit.state)
    const [zipcode, setZipcode] = useState(rentalUnit.zipcode)
    const [url, setUrl] = useState(rentalUnit.url)
    const [reviews] = useState(rentalUnit.Reviews)
    const [bookings] = useState(rentalUnit.Bookings)
    const [errors, setErrors] = useState([]);


    useEffect(() => {
        setTitle(rentalUnit?.title);
        setCity(rentalUnit?.city);
        setDistanceFromBeach(rentalUnit?.distanceFromBeach);
        setLng(rentalUnit?.lng)
        setLat(rentalUnit?.lat)
        setPrice(rentalUnit?.price);
        setPool(rentalUnit?.pool);
        setRentalUnitDescription(rentalUnit?.rentalUnitDescription);
        setBathrooms(rentalUnit?.bathrooms);
        setUnitType(rentalUnit?.unitType)
        setRooms(rentalUnit?.rooms);
        setState(rentalUnit?.state);
        setZipcode(rentalUnit?.zipcode);
        setUrl(rentalUnit?.url);


    }, [rentalUnit?.title, rentalUnit?.city, rentalUnit?.distanceFromBeach, rentalUnit?.lat, rentalUnit?.lng, rentalUnit?.price, rentalUnit?.pool,
    rentalUnit?.rentalUnitDescription, rentalUnit?.bathrooms, rentalUnit?.unitType, rentalUnit?.rooms, rentalUnit?.state, rentalUnit?.zipcode, rentalUnit?.url])

    const updateTitle = (e) => setTitle(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateDistanceFromBeach = (e) => setDistanceFromBeach(e.target.value);
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
    const updateUrl = (e) => setUrl(e.target.files[0]);



    const handleDelete = async (e) => {
        e.preventDefault();

        dispatch(deleteRentalUnit(rentalUnit.id))
        history.push('/')
        // history.push('/units')
        alert("Rental Unit Removed :(")

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const unitId = rentalUnit?.id

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
            url
        };

        const data = await dispatch(editRentalUnit(payload, unitId));
        if (data.errors) {
            setErrors(data.errors)
            return data
        } else {
            dispatch(getSingleUnit(id))
            submitModal(false)
            return data
        }

    }


    return (
        <div className="form-placement">
            <h2 className="form-title">Update Rental Unit Form</h2>
            <p className="form-title">Please fill in all fields :) </p>
            <div className="editUnitForm-container">
                <form
                    className="edit-form"
                    onSubmit={handleSubmit}
                >
                    <div className="edit-unit-errors" class='text-center text-red max-h-20 overflow-y-auto border-b-4 border-black mb-5 pb-5' hidden={!errors.length} >
                        {
                            errors.map((error) => {
                                if (error) {
                                    return (
                                        <p className='edit-error-P' key={error.id}>{error}</p>
                                    )
                                }
                                return null;
                            })
                        }
                    </div>
                    <label >Title: </label>
                    <input
                        type="text"
                        onChange={updateTitle}
                        value={title}
                        placeholder={rentalUnit?.title}
                    ></input>
                    <div className="address-container">
                        <label>City: </label>
                        <input
                            type="text"
                            onChange={updateCity}
                            placeholder={rentalUnit?.city}
                            value={city}
                        ></input>
                        <label>State: </label>
                        <input
                            type="text"
                            onChange={updateState}
                            value={state}
                            placeholder={rentalUnit?.state}
                        ></input>
                        <label>Zipcode: </label>
                        <input
                            type="text"
                            onChange={updateZipcode}
                            value={zipcode}
                            placeholder={rentalUnit?.zipcode}
                        ></input>
                    </div>
                    <h3>Unit Details & Descriptions</h3>
                    <label> Distance From The Beach (in miles): </label>
                    <input
                        type="number"
                        onChange={updateDistanceFromBeach}
                        value={distanceFromBeach}
                        placeholder={rentalUnit?.distanceFromBeach}
                    ></input>
                    <label>Rooms: </label>
                    <input
                        type="number"
                        onChange={updateRooms}
                        value={rooms}
                        placeholder={rentalUnit?.rooms}
                        min="1"
                    ></input>
                    <label>Bathrooms: </label>
                    <input
                        type="number"
                        onChange={updateBathrooms}
                        placeholder={rentalUnit?.bathrooms}
                        value={bathrooms}
                    ></input>

                    <label>Pool : </label>

                    <div class='flex pb-2'>
                        <div>
                            <input
                                onChange={updatePool}
                                value={"yes"}
                                type="radio"
                                id="yes"
                            >
                            </input>
                            <label htmlFor="yes">Yes</label>
                        </div>

                        <div class='ml-3'>
                            <input
                                onChange={updatePool}
                                value={"no"}
                                type="radio"
                                id="no"
                            >
                            </input>
                            <label htmlFor="no">No</label>
                        </div>
                    </div>
                    <div className="unit-type" class='pb-2'>
                        <label htmlFor="house">House</label>
                        <input
                            onChange={updateUnityType}
                            value={"house"}
                            type="radio"
                            id="house"
                            checked={unitType === 'house'}
                        >
                        </input>
                        <label htmlFor="apartment">Apartment</label>
                        <input
                            onChange={updateUnityType}
                            value={"apartment"}
                            type="radio"
                            id="apartment"
                            checked={unitType === 'apartment'}
                        >
                        </input>
                        <label htmlFor="singleRoom">Single Room</label>
                        <input
                            onChange={updateUnityType}
                            checked={unitType === 'single room'}
                            value={"single room"}
                            type="radio"
                            id="singleRoom"
                        >
                        </input>
                    </div>
                    <label>Latitude: </label>
                    <input
                        type="text"
                        value={lat}
                        onChange={updateLat}
                        placeholder={rentalUnit?.lat}
                    ></input>
                    <label>Longitude: </label>
                    <input
                        type="text"
                        value={lng}
                        onChange={updateLng}
                        placeholder={rentalUnit?.lng}
                    ></input>
                    <label>Price Per Night: $ </label>
                    <input
                        type="text"
                        value={price}
                        onChange={updatePrice}
                        placeholder={rentalUnit?.price}
                    ></input>
                    <label>Image : </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={updateUrl}
                    ></input>
                    <label>Unit Description: </label>
                    <textarea
                        class='p-2'
                        onChange={updateRentalUnitDescription}
                        value={rentalUnitDescription}
                        placeholder={rentalUnit?.rentalUnitDescription}
                    ></textarea>
                    <button type="submit">Submit</button>
                    <button
                        type="submit"
                        onClick={handleDelete}
                    >Delete</button>
                </form>
            </div>
        </div>
    )
}


export default EditUnitForm;
