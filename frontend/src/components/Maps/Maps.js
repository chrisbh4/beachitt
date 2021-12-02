// frontend/src/components/Maps/Maps.js
import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '900px',
  height: '500px',
};



const Maps = ({ apiKey, lat, lng }) => {

  // * look into lat n lng to see if it is a string or a number because the maps is failing

  console.log("Maps lat:", lat)
  console.log("Maps lng:", lng)

  /*
  * Change the center's lat n lng values to the prop lat n lng values
  * create a marker that holds its lat n lng values from the passed in props
    - Link : https://developers.google.com/maps/documentation/javascript/adding-a-google-map#step_2_add_a_map_with_a_marker

  */



  const center = {
  // center just displays the surrounding the location regardless if the values point to a specific postion
  lat,
  lng
  };

  const position = {
    lat,
    lng
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });


  // const marker = new Marker({
  //   position,
  //   map:center
  // });

  /*
      *
      - can pass in the unit's lng & lat as the markers object key values for lat & lng
        - will have to pass in the unit's lat n lng as props inside the MapContainer component to be able to place inside the marker
  */

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
