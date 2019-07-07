import React, { useState } from "react";

import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  DirectionsRenderer
} from "react-google-maps";

import SearchComponent from "../Search";

class Map extends React.Component {
  state = {
    lat: null,
    lng: null,
    destination: { name: null },
    directions: {
      status: null,
      routes: []
    },
    origin: { name: null },
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
      origin
    });
  };

  getDestination = destination => {
    this.setState({
      ...this.state,
      destination
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.getRoute();
  };

  onReset = e => {
    this.setState({
      lat: null,
      lng: null,
      destination: { name: null },
      directions: {
        status: null,
        routes: null
      },
      origin: { name: null },
      error: null,
      loading: false
    });
  };

  getRoute = async () => {
    this.setState({ ...this.state, loading: true });
    const DirectionsService = new window.google.maps.DirectionsService();
    DirectionsService.route(
      {
        origin: new window.google.maps.LatLng(
          this.state.origin.geometry.location.lat(),
          this.state.origin.geometry.location.lng()
        ),
        destination: new window.google.maps.LatLng(
          this.state.destination.geometry.location.lat(),
          this.state.destination.geometry.location.lng()
        ),
        travelMode: window.google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          this.setState({ ...this.state, loading: false, directions: result });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };

  renderDetails = () => {
    const {
      loading,
      directions: { status, routes }
    } = this.state;

    if (loading) {
      return <span>Loading...</span>;
    } else {
      return (
        <>
          <span>{status ? "Success" : ""}</span>
          <span>
            {routes.length >= 1
              ? `Total Distance: ${routes[0].legs[0].distance.text}`
              : ""}
          </span>
          <span>
            {routes.length >= 1
              ? `Total Distance: ${routes[0].legs[0].duration.text}`
              : ""}
          </span>
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
    const { lng, lat, origin, destination, directions } = this.state;

    return (
      <>
        {this.state.lat ? (
          <>
            <SearchComponent
              onSubmit={this.onSubmit}
              onReset={this.onReset}
              getOrigin={this.getOrigin}
              getDestination={this.getDestination}
              renderDetails={this.renderDetails}
            />

            <GoogleMap defaultZoom={12} defaultCenter={{ lat, lng }}>
              {this.isMarkerShown && <Marker position={{ lat, lng }} />}
              {origin.name && destination.name && directions && (
                <DirectionsRenderer directions={this.state.directions} />
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
