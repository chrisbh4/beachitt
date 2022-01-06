import {csrfFetch} from "./csrf"

const LOAD = 'units/LOAD';
const ADD_ONE = 'units/ADD_ONE';
const DELETE_UNIT= 'units/DELETE_UNIT';
const EDIT_UNIT= 'units/EDIT_UNIT';

const load = units => ({
    type: LOAD,
    units,
  });

  const addUnit = unit => ({
    type: ADD_ONE,
    unit,
  });

  const deleteUnit = (unitId)=>({
    type: DELETE_UNIT,
    unitId,
  })

  const editUnit = (unitId)=>({
    type:EDIT_UNIT,
    unitId,
  })

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

  if(res.ok) dispatch(addUnit(data))

  return data
}


/*

* The error is coming from the reducer
  * - I need to be able to spread the new data in with the old


*/



  const initialState = {};

  const rentalUnitReducer = ( state = initialState , action )=>{
    switch( action.type ){
      case LOAD:{
        return {...state, ...action.units}
      }
      case ADD_ONE:{
        const newState = {...state}
        newState[action.unit.id] = action.unit;
        return newState;
      }
      case DELETE_UNIT:{
        const newState = {...state};
        delete newState[action.unitId]
        return {...newState}
      }
      case EDIT_UNIT:{
        return{
          ...state,...action.unit
        }
      }
      default:
        return state;
    }
  }


  export default rentalUnitReducer
