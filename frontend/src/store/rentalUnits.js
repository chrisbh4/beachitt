import {csrfFetch} from "./csrf"

const LOAD = 'units/LOAD';
const ADD = 'units/ADD';
const DELETE= 'units/DELETE';
const EDIT= 'units/EDIT';

const load = units => ({
    type: LOAD,
    units,
  });

  const addUnit = unit => ({
    type: ADD,
    unit,
  });

  const deleteUnit = (unitId)=>({
    type: DELETE,
    unitId,
  })

  const editUnit = (unit)=>({
    type:EDIT,
    unit,
  })





  //* grabs all units
  export const getRentalUnits = () => async dispatch => {
    const res = await csrfFetch(`/api/units`);
    const data = await res.json();

    dispatch(load(data))
  };

  export const getSingleUnit = (unitId)=> async dispatch =>{
    const rentalUnit = await csrfFetch(`/api/units/${unitId}`);
    const unit = await rentalUnit.json();

    dispatch(load(unit))
    return unit
  }


  export const createRentalUnit = (payload) => async dispatch =>{
    const formData = new FormData();
    const {title,ownerId,city,state,zipcode,distanceFromBeach,rooms,bathrooms,pool,unitType,lat,lng, price, rentalUnitDescription ,totalRental ,url } = payload
    formData.append("title",title)
    formData.append("ownerId",ownerId)
    formData.append("city",city)
    formData.append("state",state)
    formData.append("zipcode",zipcode)
    formData.append("distanceFromBeach",distanceFromBeach)
    formData.append("rooms",rooms)
    formData.append("bathrooms",bathrooms)
    formData.append("pool", pool)
    formData.append("unitType",unitType)
    formData.append("lat", lat)
    formData.append("lng",lng)
    formData.append("price",price)
    formData.append("rentalUnitDescription", rentalUnitDescription)
    formData.append("totalRentals", totalRental)

    if (url) formData.append("url",url);

    const res = await csrfFetch(`/api/units/new`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    const data = await res.json();

    console.log(data)
    if(res.ok) dispatch(addUnit(data))

    return data
  }


  export const editRentalUnit = (payload ,unitId)=> async dispatch =>{

    const formData = new FormData();
    const {title,city,state,zipcode,distanceFromBeach,rooms,bathrooms,pool,unitType,lat,lng, price, rentalUnitDescription ,url } = payload
    formData.append("title",title)
    formData.append("city",city)
    formData.append("state",state)
    formData.append("zipcode",zipcode)
    formData.append("distanceFromBeach",distanceFromBeach)
    formData.append("rooms",rooms)
    formData.append("bathrooms",bathrooms)
    formData.append("pool", pool)
    formData.append("unitType",unitType)
    formData.append("lat", lat)
    formData.append("lng",lng)
    formData.append("price",price)
    formData.append("rentalUnitDescription", rentalUnitDescription)

    if (url) formData.append("url",url);

    const res = await csrfFetch(`/api/units/edit/${unitId}`,{
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    const data = await res.json();

    if(res.ok) dispatch(editUnit(data))
    return data

  }


export const deleteRentalUnit = (unitId)=> async dispatch=>{
    const res = await csrfFetch(`/api/units/edit/${unitId}`,{
      method:"DELETE"
    });

    const data = await res.json();

    if(res.ok) dispatch(deleteUnit(data))
    return data
  }


/*

* Need to understand how my ADD thunk has two objects instead of just one
  1. Need to fix the POST api route return from
  2. Grab the fetched response properly after its been jsonifyed
  3. Key into the action correctly

*/



  const initialState = {};

  const rentalUnitReducer = ( state = initialState , action )=>{
    switch( action.type ){
      case LOAD:{
        return {...state, ...action.units}
      }
      case ADD:{
        const newState = {...state}
        newState[action.unit.id] = action.unit;
        // newState[action.unit.newUnit.id] = action.unit.newUnit;
        return {...newState}
      }
      case DELETE:{
        const newState = {...state};
        delete newState[action.unitId]
        return {...newState}
      }
      //* Edit functionality is removing the Reviews associated with the Unit
      case EDIT:{
        const newState = {...state}
        newState[action.unit.id]=action.unit
        return {...newState}
        // return{
        //   ...state,...action.unit
        // }
      }
      default:
        return state;
    }
  }


  export default rentalUnitReducer
