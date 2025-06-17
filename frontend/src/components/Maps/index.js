// frontend/src/components/Maps/index.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getKey } from '../../store/maps';
import Maps from './Maps';


/*
  * will receive the Unit's lat & lng as a prop value
  * will also need to save the prop values as another variable to be able to pass as another prop to the Maps componenet

*/


const MapContainer = ({lat,lng}) => {
  const key = useSelector((state) => state.mapApi.key);
  const dispatch = useDispatch();

  // Validate coordinates
  const unitLat = lat !== undefined && lat !== null ? lat : 25.7907; // Default to Miami Beach
  const unitLng = lng !== undefined && lng !== null ? lng : -80.1300;

  useEffect(() => {
    if (!key) {
      dispatch(getKey());
    }
  }, [dispatch, key]);

  if (!key) {
    return null;
  }

  return (
    <Maps apiKey={key} lat={unitLat} lng={unitLng} />
  );

};

export default MapContainer;
