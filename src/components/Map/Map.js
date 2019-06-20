import React from "react";

import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

const getPosition = () => {
  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej);
  });
};

const Map = () => {
  getPosition().then(res => {
    const {
      coords: { latitude: lat },
      coords: { longitude: lng }
    } = res;
    return <GoogleMap defaultZoom={10} defaultCenter={{ lat, lng }} />;
  });

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 14.676041, lng: 121.043701 }}
    />
  );
};

export default withScriptjs(withGoogleMap(Map));
