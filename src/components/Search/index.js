import React from "react";

import StandaloneSearchbox from "./StandaloneSearchBox";

const SearchComponent = props => {
  const { onSubmit, onReset, getOrigin, getDestination, renderDetails } = props;

  return (
    <form
      onSubmit={onSubmit}
      onReset={onReset}
      style={{
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        top: "5rem",
        left: "1rem",
        height: "18rem",
        justifyContent: "space-between",

        padding: "20px",
        borderRadius: "5px",
        backgroundColor: "floralwhite",
        boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
      }}
    >
      <label>Starting location</label>
      <StandaloneSearchbox
        placeHolder="Set origin"
        name="origin"
        getLocation={getOrigin}
        style={{ border: "none" }}
      />
      <label>Drop-off point</label>
      <StandaloneSearchbox
        placeHolder="Set destination"
        name="destination"
        getLocation={getDestination}
      />
      {renderDetails()}
      <div>
        <button
          style={{ width: "100px", height: "40px", marginRight: "20px" }}
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
        <button
          className="btn btn-danger"
          style={{ width: "100px", height: "40px" }}
          type="reset"
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default SearchComponent;
