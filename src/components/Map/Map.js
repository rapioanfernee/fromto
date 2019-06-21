import React, { useState } from "react";

import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker
} from "react-google-maps";

import Directions from "./Directions";
import SearchBox from "./SearchBox";

import mockAPI from "../../apis/mock";

class Map extends React.Component {
  state = {
    lat: null,
    lng: null,
    destination: null,
    origin: null,
    result: null
  };
  constructor(props) {
    super(props);
    this.setState({
      lat: null,
      lng: null,
      destination: null,
      origin: null,
      result: null
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.state.origin !== null &&
      this.state.destination !== null &&
      (prevState.origin !== this.state.origin ||
        prevState.destination !== this.state.destination)
    ) {
      console.log("Fetching");
      mockAPI
        .post("/route", {
          origin: this.state.origin,
          destination: this.state.destination
        })
        .then(res => {
          console.log(res);
          mockAPI.get(`/route/${res.data}`).then(res2 => {
            console.log(res2);
            this.setState({ ...this.state, result: res2.data });
          });
        });
    }
    console.log(this.state);
  }

  getPosition = () => {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej);
    });
  };

  getOrigin = origin => {
    console.log(origin);
    this.setState({ ...this.state, origin: origin.name });
  };

  getDestination = destination => {
    console.log(destination);
    this.setState({ ...this.state, destination: destination.name });
  };

  render() {
    this.getPosition().then(res => {
      const {
        coords: { latitude: lat },
        coords: { longitude: lng }
      } = res;
      this.setState({ ...this.state, lat, lng });
    });
    const { lng, lat } = this.state;

    return (
      <>
        {this.state.lat ? (
          <GoogleMap defaultZoom={13} defaultCenter={{ lat, lng }}>
            {this.isMarkerShown && <Marker position={{ lat, lng }} />}
            <Directions
              origin={{ lat, lng }}
              destination={{ lat: 14.56335, lng: 120.997589 }}
            />

            <SearchBox name="origin" getLocation={this.getOrigin} />
            <SearchBox name="destination" getLocation={this.getDestination} />
          </GoogleMap>
        ) : (
          <div>Loading...</div>
        )}
      </>
    );
  }
}

export default withScriptjs(withGoogleMap(Map));
