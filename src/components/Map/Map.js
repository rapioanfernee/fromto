import React, { useState } from "react";

import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker
} from "react-google-maps";

import Directions from "./Directions";
import SearchBox from "./SearchBox";
import StandaloneSearchBox from "./StandaloneSearchBox";

import mockAPI from "../../apis/mock";

class Map extends React.Component {
  state = {
    lat: null,
    lng: null,
    destination: { name: null },
    origin: { name: null },
    result: {
      path: [],
      total_distance: null,
      total_time: null,
      status: null,
      error: null
    },
    error: null,
    loading: false
  };

  getPosition = () => {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej);
    });
  };

  getOrigin = origin => {
    this.setState({
      ...this.state,
      result: {
        path: [],
        total_distance: null,
        total_time: null,
        status: null,
        error: null
      },
      origin
    });
  };

  getDestination = destination => {
    this.setState({
      ...this.state,
      result: {
        path: [],
        total_distance: null,
        total_time: null,
        status: null,
        error: null
      },
      destination
    });
  };

  onSubmit = e => {
    e.preventDefault();

    this.setState({ ...this.state, loading: true });

    this.getRoute();
  };

  onReset = e => {
    this.setState({
      destination: { name: null },
      origin: { name: null },
      result: {
        path: [],
        total_distance: null,
        total_time: null,
        status: null,
        error: null
      },
      error: null,
      loading: false
    });
  };

  getRoute = async () => {
    this.setState({ ...this.state, loading: true });
    let responseRoute = { data: { status: null } };
    let responseToken = null;

    do {
      try {
        responseToken = await mockAPI.post("/route", {
          origin: this.state.origin.name,
          destination: this.state.destination.name
        });
      } catch (error) {
        responseToken = null;
      }
    } while (responseToken === null);

    do {
      try {
        responseRoute = await mockAPI.get(`/route/${responseToken.data}`);
      } catch (error) {
        responseRoute = { data: { status: null } };
        console.log("An error occurred");
      }
    } while (
      responseRoute.data.status !== "failure" &&
      responseRoute.data.status !== "success"
    );

    this.setState({
      ...this.state,
      loading: false,
      result: responseRoute.data
    });
  };

  renderDetails = () => {
    const { loading, result } = this.state;
    if (loading) {
      return <span>Loading...</span>;
    } else {
      return (
        <>
          <span>{result.status ? result.status : ""}</span>
          <span>
            {result.total_distance
              ? `Total Distance: ${result.total_distance}m`
              : ""}
          </span>
          <span>
            {result.total_time ? `Total Time: ${result.total_time}m` : ""}
          </span>
          <span>{result.error ? result.error : ""}</span>
        </>
      );
    }
  };

  render() {
    this.getPosition().then(res => {
      const {
        coords: { latitude: lat },
        coords: { longitude: lng }
      } = res;
      this.setState({ ...this.state, lat, lng });
    });
    const { lng, lat, origin, destination, result } = this.state;

    return (
      <>
        {this.state.lat ? (
          <>
            <form
              onSubmit={this.onSubmit}
              onReset={this.onReset}
              style={{
                display: "flex",
                flexDirection: "column",
                position: "absolute",
                top: "20rem",
                left: "2rem",
                height: "15rem",
                justifyContent: "space-between"
              }}
            >
              <label>Starting location</label>
              <StandaloneSearchBox
                placeHolder="Set origin"
                name="origin"
                getLocation={this.getOrigin}
              />
              <label>Drop-off point</label>
              <StandaloneSearchBox
                placeHolder="Set destination"
                name="destination"
                getLocation={this.getDestination}
              />
              {this.renderDetails()}
              <div>
                <button
                  style={{
                    width: "100px",
                    height: "25px",
                    marginRight: "20px"
                  }}
                  type="submit"
                >
                  Submit
                </button>
                <button style={{ width: "100px", height: "25px" }} type="reset">
                  Reset
                </button>
              </div>
            </form>

            <GoogleMap defaultZoom={12} defaultCenter={{ lat, lng }}>
              {this.isMarkerShown && <Marker position={{ lat, lng }} />}
              {origin.name && destination.name && result.total_distance && (
                <Directions
                  origin={{
                    lat: origin.geometry.location.lat(),
                    lng: origin.geometry.location.lng()
                  }}
                  destination={{
                    lat: destination.geometry.location.lat(),
                    lng: destination.geometry.location.lng()
                  }}
                  directions={result.path}
                />
              )}
            </GoogleMap>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </>
    );
  }
}

export default withScriptjs(withGoogleMap(Map));
