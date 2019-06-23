import React from "react";

import Map from "./Map";
import StandaloneSearchBox from "./StandaloneSearchBox";





function MapBox(props) {

  return (
    <div style={{ height: "99vh", width: "90vw",  display: "flex" }}>
      <div style={{ height: "100%", width: "30%"}} />
      <Map
        style = {{width: "80%"}}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
          process.env.REACT_APP_API_KEY
        }`}
        loadingElement={
          <div className="loadingElement" style={{ height: "100%" }} />
        }
        containerElement={
          <div className="containerElement" style={{ height: "100%", width: "100%" }} />
        }
        mapElement={<div className="mapElement" style={{ height: "100%" }} />}
        isMarkerShown
        {...props}
      />
    </div>
  );
}

export default MapBox;
