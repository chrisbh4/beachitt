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

  debugger
  const res = await csrfFetch(`/api/units/new`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });


  const newUnit = await res.json();
  debugger
  if(newUnit.ok) dispatch(addUnit(newUnit))

  return newUnit
}

//* creates a single image
// export const createImage = (payload) => async dispatch =>{
//   const res = await csrfFetch('/api/images/new',{
//     method: 'POST',
//     header:{"Content-Type": "application/json"},
//     body: JSON.stringify(payload)
//   });

//   const image = await res.json();

//   if(image.ok) dispatch(addUnit(image))

//   return image
// }




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
        return newState;
      }
      case DELETE_UNIT:{
        const newState = {...state};
        delete newState[action.unitId]
        return newState
      }
      case EDIT_UNIT:{
        // const newState = {...state};
        // newState.allRentalUnits.forEach(( unit )=>{
        //   if( unit.id === action.unit.unit.id){
        //     unit.title = action.unit.unit.title;
        //     unit.city = action.unit.unit.city;
        //     unit.distanceFromBeach = action.unit.unit.distanceFromBeach;
        //     unit.lat = action.unit.unit.lat;
        //     unit.lng = action.unit.unit.lng;
        //     unit.pool = action.unit.unit.pool;
        //     unit.price = action.unit.unit.price;
        //     unit.rentalUnitDescription = action.unit.unit.rentalUnitDescription;
        //     unit.bathrooms = action.unit.unit.bathrooms;
        //     unit.unitType = action.unit.unit.unitType;
        //     unit.rooms = action.unit.unit.rooms;
        //     unit.state = action.unit.unit.state;
        //     unit.zipcode = action.unit.unit.zipcode;
        //   }
        //   return newState;
        // })
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
