import {csrfFetch} from "./csrf"

const LOAD = 'units/LOAD'

const load = units => ({
    type: LOAD,
    units,
  });


  export const getRentalUnits = () => async dispatch => {
    const rentalUnitCollection = await csrfFetch(`/api/units`);
    const rentalUnits = await rentalUnitCollection.json();

    // console.log('rentalUnits From store: ', rentalUnits )
      dispatch(load(rentalUnits))
  };

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
      default:
        return state;
    }
  }


  export default rentalUnitReducer
