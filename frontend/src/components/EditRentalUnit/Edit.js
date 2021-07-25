import React, { useState , useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editRentalUnit, getRentalUnits , deleteRentalUnit } from "../../store/rentalUnits";
import '../EditRentalUnit/EditRentalUnit.css'

function EditUnitForm(){

    const { id } = useParams();
    const dispatch = useDispatch()
    const history = useHistory()
    //  trying to get rentalUnits from the currentstate from the id of the clicked on unit
    //  const rentalUnit = useSelector(state => state.rentalUnit[id]);

    // console.log(id)

    const rentalUnit = useSelector((state)=>(state.rentalUnit[id]))
    //! Need to use rentalUnit?.title
        // checks if rentalUnit.title exsist in the rentalUnit
    console.log(rentalUnit?.ownerId)

    // console.log(rentalUnits.title)

    useEffect(()=>{
        dispatch(getRentalUnits())
    },[dispatch])

// ! editRentalUnit()
    // useEffect(()=>{
    //     dispatch(editRentalUnit())
    // },[dispatch])




    // allows for empty inputs and sends non-updated data with the updated data
    const [title, setTitle] = useState(rentalUnit?.title)
    const [city, setCity] = useState(rentalUnit?.city)
    const [distanceFromBeach, setDistanceFromBeach] = useState(rentalUnit?.distanceFromBeach)
    const [lat, setLat] = useState(rentalUnit?.lat)
    const [lng, setLng] = useState(rentalUnit?.lng)
    const [price, setPrice] = useState(rentalUnit?.price)
    const [pool, setPool] = useState(rentalUnit?.pool)
    const [rentalUnitDescription, setRentalUnitDescription] = useState(rentalUnit?.rentalUnitDescription)
    const [bathrooms, setBathrooms] = useState(rentalUnit?.bathrooms)
    const [unitType, setUnitType] = useState(rentalUnit?.unitType)
    const [rooms, setRooms] = useState(rentalUnit?.rooms)
    const [state, setState] = useState(rentalUnit?.state)
    const [zipcode, setZipcode] = useState(rentalUnit?.zipcode)


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


    const handleDelete = async (e)=>{
        e.preventDefault();

        dispatch(deleteRentalUnit(rentalUnit.id))
        history.push('/units')
        throw alert("Rental Unit Removed :(")

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

        };
        // let newUnit = dispatch(createRentalUnit(payload));
        // if(newUnit){
        //     return newUnit
        // }
        dispatch(editRentalUnit(payload, unitId));
        history.push('/units')
        throw alert("Rental Unit Updated :)")
        // reset();
    }


    return (
        <div>
            <h2>Update Rental Unit Form</h2>
            <p>Please fill in all fields :) </p>
            <div className="editUnitForm-container">
                <form
                    onSubmit={handleSubmit}
                    >
                    <label>Title: </label>
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
                <div className="unit-type">

                <label htmlFor="house">House</label>
					<input
						onChange={updateUnityType}
						value={"house"}
						type="radio"
                        id="hosue"
                        checked={unitType === 'house'}
						// id="house"
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
