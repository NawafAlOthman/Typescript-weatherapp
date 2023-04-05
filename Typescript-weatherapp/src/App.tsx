import React, { useState, useCallback } from "react";
import { Button, Collapse } from "react-bootstrap";

import Spinner from "./components/Spinner";
import useWeatherSearch from "./hooks/useWeatherSearch";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/01d.svg";
import SearchBar from "./components/Search";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./App.css";

function App() {
  document.body.style.backgroundColor = "#d8d8d8";
  return (
    <div>
      <SearchBar />
    </div>
  );
}

export default App;
