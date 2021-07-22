import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';



function NewUnitForm (){

    const [ title, setTitle ] = useState("")
    const [ city , setCity  ] = useState("")
    const [ distanceFromBeach, setDistanceFromBeach ] = useState("")
    const [ lat , setLat ] = useState("")
    const [ lng , setLng ] = useState("")
    const [ price, setPrice ] = useState("")
    const [ pool, setPool ] = useState("")
    const [ rentalUnitDescription, setRentalUnitDescription] = useState("")
    const [ bathrooms , setBathrooms ] = useState(1)
    const [ unitType , setUnitType ] = useState("")
    const [ rooms , setRooms ] = useState(1)
    const [ state , setState ] = useState("")
    const [ zipcode , setZipcode ] = useState("")
    const [ totalRentals ] = useState(0)
    const [] = useState("")


    return (
        <div>
            <h2>New Rental Unit Form</h2>
            <div className="newUnitForm-container">
                <form>
                    <label>Title: </label>
                    <input
                        type="text"
                        value={title}
                    ></input>
                    <div className="address-container">
                        <label>City: </label>
                        <input
                            type="text"
                            value={city}
                            ></input>
                        <label>State: </label>
                        <input
                            type="text"
                            value={state}
                            ></input>
                        <label>Zipcode: </label>
                        <input
                            type="text"
                            value={zipcode}
                            ></input>
                    </div>
                    <h3>Unit Details & Descriptions</h3>
                    <label> Distance From The Beach (in miles): </label>
                        <input
                            type="number"
                            value={distanceFromBeach}
                        ></input>
                    <label>Rooms: </label>
                        <input
                            type="number"
                            value={rooms}
                            min="1"
                     ></input>
                    <label>Bathrooms: </label>
                        <input
                            type="number"
                            value={bathrooms}
                     ></input>
                     <label>Pool (yes or no): </label>
                        <input
                            type="text"
                            value={pool}
                            max="3"
                     ></input>
                     <select name="unitType">
                         <option value={unitType}>
                            House
                            </option>
                        <option value={unitType}>
                            Apartment
                        </option>
                        <option value={unitType} >
                            Single Room
                        </option>
                     </select>
                     <label>Latitude: </label>
                        <input
                            type="text"
                            value={lat}
                     ></input>
                    <label>Longitude: </label>
                        <input
                            type="text"
                            value={lng}
                     ></input>
                     <label>Price Per Night: $ </label>
                        <input
                            type="text"
                            value={price}
                     ></input>
                    <label>Unit Description: </label>
                     <textarea
                        value={rentalUnitDescription}
                    ></textarea>
                <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}


export default NewUnitForm
