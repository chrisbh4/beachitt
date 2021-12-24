import {csrfFetch} from "./csrf"

const LOAD = 'units/LOAD';

const DELETE_UNIT= 'units/DELETE_UNIT';
const EDIT_UNIT= 'units/EDIT_UNIT';

const load = units => ({
    type: LOAD,
    units,
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

  const rentalUnit = await res.json();
  if(rentalUnit.ok) dispatch(editUnit(rentalUnit))

}

export const deleteRentalUnit = (unitId)=> async dispatch=>{
  const res = await csrfFetch(`/api/units/edit/${unitId}`,{
    method:"DELETE"
  });

  const rentalUnit = await res.json();

  if(rentalUnit.id.ok) dispatch(deleteUnit(rentalUnit))

}


//* grabs all units
export const getRentalUnits = () => async dispatch => {
    const res = await csrfFetch(`/api/units`);
    const rentalUnits = await res.json();

      dispatch(load(rentalUnits))
  };
export const getSingleUnit = (unitId)=> async dispatch =>{
  const rentalUnit = await csrfFetch(`/units/${unitId}`);

    const unit = await rentalUnit.json();
    dispatch(load(unit))
}







const ADD_ONE = 'units/ADD_ONE';



 // * addUnit action.type is not being loaded
 const addUnit = unit => ({
  type: ADD_ONE,
  unit,
});


export const createRentalUnit = (payload) => async dispatch =>{
  const formData = new FormData();
  const {title,ownerId,city,state,zipcode,distanceFromBeach,rooms,bathrooms,pool,unitType,lat,lng, price, rentalUnitDescription ,totalRental ,url } = payload;
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

  const newUnit = await res.json();

  if(newUnit) dispatch(addUnit(newUnit))

  return newUnit
}




  const initialState = {};

  const rentalUnitReducer = ( state = initialState , action )=>{
    switch( action.type ){
      case LOAD:{
        return {...state, ...action.units}
      }
      case ADD_ONE:{
        const newState ={
          ...state,
        [action.unit.id]:action.unit
        };
        return {...newState};
      }
      case DELETE_UNIT:{
        const newState = {...state};
        delete newState[action.unitId]
        return {...newState}
      }
      case EDIT_UNIT:{
        return{
          ...state,
          [action.review.id]: action.review
        }
      }
      default:
        return state;
    }
  }


  export default rentalUnitReducer
