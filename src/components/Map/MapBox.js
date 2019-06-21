import React from "react";

import Map from "./Map";

function MapBox() {
  return (
    <div style={{ height: "80vh", width: "80vw" }}>
      <Map
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
          process.env.REACT_APP_API_KEY
        }`}
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "100%" }} />}
        isMarkerShown
      />
    </div>
  );
}

export default MapBox;
