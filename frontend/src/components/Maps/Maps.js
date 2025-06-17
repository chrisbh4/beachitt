// frontend/src/components/Maps/Maps.js
import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px',
};



const Maps = ({ apiKey, lat, lng }) => {

  // Convert to numbers and validate
  const unitLat = Number(lat);
  const unitLng = Number(lng);

  // Check if coordinates are valid numbers
  const isValidLat = !isNaN(unitLat) && isFinite(unitLat);
  const isValidLng = !isNaN(unitLng) && isFinite(unitLng);

  // Default coordinates (Miami Beach, FL) if coordinates are invalid
  const defaultLat = 25.7907;
  const defaultLng = -80.1300;

  // Use valid coordinates or defaults
  const finalLat = isValidLat ? unitLat : defaultLat;
  const finalLng = isValidLng ? unitLng : defaultLng;

  /*
  * Change the center's lat n lng values to the prop lat n lng values
  * create a marker that holds its lat n lng values from the passed in props
    - Link : https://developers.google.com/maps/documentation/javascript/adding-a-google-map#step_2_add_a_map_with_a_marker
  */

  const center = {
  // center just displays the surrounding the location regardless if the values point to a specific postion
  lat: finalLat,
  lng: finalLng
  };

  const position = {
    lat: finalLat,
    lng: finalLng
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

 
  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}>
            <Marker
              position={position}
              />

          </GoogleMap>


      )}
    </>
  );
};

export default React.memo(Maps);
