import React, { useState } from "react";

import { DirectionsRenderer } from "react-google-maps";

const Directions = props => {
  const [directions, setDirections] = useState(null);
  const DirectionsService = new window.google.maps.DirectionsService();
  DirectionsService.route(
    {
      origin: new window.google.maps.LatLng(props.origin.lat, props.origin.lng),
      destination: new window.google.maps.LatLng(
        props.destination.lat,
        props.destination.lng
      ),
      travelMode: window.google.maps.TravelMode.DRIVING
    },
    (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        setDirections({ directions: result });
      } else {
        console.error(`error fetching directions ${result}`);
      }
    }
  );

  return directions ? (
    <DirectionsRenderer directions={directions.directions} />
  ) : (
    ""
  );
};

export default Directions;
