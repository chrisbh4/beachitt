import {csrfFetch} from "./csrf"

const LOAD = 'units/LOAD';
const ADD_ONE = 'units/ADD_ONE';

const load = units => ({
    type: LOAD,
    units,
  });

  const addRentalUnit = unit => ({
    type: ADD_ONE,
    unit,
  });


export const getRentalUnits = () => async dispatch => {
    const rentalUnitCollection = await csrfFetch(`/api/units`);
    const rentalUnits = await rentalUnitCollection.json();

    // console.log('rentalUnits From store: ', rentalUnits )
      dispatch(load(rentalUnits))
  };


export const createRentalUnit = (payload) => async dispatch =>{
  const res = await csrfFetch('/api/units/new',{
    method: 'POST',
    header:{"Content-Type": "application/json"},
    body: JSON.stringify(payload)
  });

  const newUnit = await res.json();

  if(newUnit.ok) dispatch(addRentalUnit(newUnit))

  return newUnit
}




  const initialState = {
    units:[],
  };



  const rentalUnitReducer = ( state = initialState , action )=>{
    switch( action.type ){
      case LOAD:{
        const allRentalUnits ={
          // took out the ...state since it was spreading in an empty array
        };
        action.units.forEach( unit =>{
          allRentalUnits[unit.id] = unit
        })
        return {
          ...allRentalUnits
          // ...allRentalUnits,
          // ...state,
        }
      }
      case ADD_ONE:{
        const newState ={
          ...state,
          [action.unit.id]:action.unit
        };
        return newState;

      }
      default:
        return state;
    }
  }


  export default rentalUnitReducer
