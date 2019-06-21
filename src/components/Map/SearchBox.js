import React, { Component } from "react";

import { SearchBox } from "react-google-maps/lib/components/places/SearchBox";

import _ from "lodash";

class SearchBox2 extends Component {
  componentDidMount() {
    this.ref = React.createRef();

    this.setState({
      bounds: null
    });
  }

  onPlacesChanged = () => {
    const places = this.ref.current.getPlaces();
    const bounds = new window.google.maps.LatLngBounds();

    places.forEach(place => {
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    this.props.getLocation(places[0]);
    const nextMarkers = places.map(place => ({
      position: place.geometry.location
    }));
    const nextCenter = _.get(nextMarkers, "0.position", this.state.center);

    this.setState({
      center: nextCenter,
      markers: nextMarkers
    });
  };

  render() {
    return (
      <SearchBox
        ref={this.ref}
        onPlacesChanged={this.onPlacesChanged}
        controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
      >
        <input
          type="text"
          placeholder="Customized your placeholder"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            marginTop: `27px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`
          }}
        />
      </SearchBox>
    );
  }
}

export default SearchBox2;
