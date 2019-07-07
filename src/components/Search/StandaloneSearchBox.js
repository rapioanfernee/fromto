import React, { Component } from "react";

import { StandaloneSearchBox } from "react-google-maps/lib/components/places/StandaloneSearchBox";
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
      <StandaloneSearchBox
        ref={this.ref}
        onPlacesChanged={this.onPlacesChanged}
      >
        <input
          type="text"
          placeholder={this.props.placeHolder}
          style={{
            boxSizing: `border-box`,
            border: `1px solid black`,
            width: `20rem`,
            height: `32px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`
          }}
        />
      </StandaloneSearchBox>
    );
  }
}

export default SearchBox2;
