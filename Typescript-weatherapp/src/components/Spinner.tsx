/*
 * Spinner derived from https://tobiasahlin.com/spinkit/.
 */

import React from "react";

import "./Spinner.css";

function Spinner() {
  let size = 12;
  let color = "#333";

  return (
    <div className="spinner">
      <div className="dot" />
      <div className="dot" />
      <div className="dot" />
    </div>
  );
}

export default Spinner;
