import React from "react";
import MapBox from "./Map/MapBox";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  render() {
    return (
      <div>
        <MapBox />
      </div>
    );
  }
}

export default App;
