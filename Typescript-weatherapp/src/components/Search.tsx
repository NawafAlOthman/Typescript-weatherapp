import { useState, useEffect } from "react";
import { Button, Collapse } from "react-bootstrap";

import Spinner from "../components/Spinner";
import useWeatherSearch from "../hooks/useWeatherSearch";
import AliceCarousel from "react-alice-carousel";

function timeConverter(UNIX_timestamp: number) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  if (min < 10) {
    min = "0" + min;
  }
  var timeCal = month + " " + date;
  let hourMins = hour + ":" + min;
  return [timeCal, hourMins];
}

function SearchBar() {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [currWeather, weather, loading, error] = useWeatherSearch(query);
  const [items, setItems] = useState<any>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(search);
    // Do nothing here since the useWeatherSearch call is in the hook

    // const newItems = currWeather.list?.map((data: any) => (
    //   <WeatherCard
    //     key={data.dt}
    //     icon={data.weather[0].icon}
    //     description={data.weather[0].description}
    //     temp={data.main.temp}
    //     date={data.dt}
    //   />
    // ));
    // setItems(newItems);
  };

  useEffect(() => {
    const newItems = currWeather.list?.map((data: any) => (
      <WeatherCard
        key={data.dt}
        icon={data.weather[0].icon}
        description={data.weather[0].description}
        temp={data.main.temp}
        date={data.dt}
      />
    ));
    console.log("current weather : ", currWeather);
    setItems(newItems);
  }, [currWeather]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {currWeather.city ? (
          <h2>
            {currWeather.city.name},{weather.city.country}
          </h2>
        ) : (
          <h2></h2>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          // allow letters A-Z, a-z, and commas
          pattern="[A-Za-z, ]*"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          // create margin between the input and the button
          style={{ marginRight: "0.5rem" }}
        />
        <button
          type="submit"
          // make the button prettier
        >
          Search
        </button>
      </form>

      {/* Display the spinner while loading */}
      {loading && <Spinner />}
      {/* Display an error message if there is an error */}
      {error && <div>{error}</div>}
      {/* Display the weather data if it exists */}
      <div>
        {items ? (
          <AliceCarousel
            mouseTracking
            keyboardNavigation
            items={items}
            disableButtonsControls
          />
        ) : (
          <h2></h2>
        )}
      </div>
    </div>
  );
}

function WeatherCard({ icon, description, temp, date }: any) {
  const [open, setOpen] = useState(false);

  const handleDragStart = (e) => e.preventDefault();

  let [timeCal, hourMins] = timeConverter(date);
  return (
    <div
      style={{
        // have the cards be centered
        justifyContent: "center",
        // have the cards be spaced out
        margin: "0.5rem",
        // make the cards prettier
        borderColor: "black",
        borderStyle: "solid 0.05px",
        // have the text be away from the edges of the card
        padding: "0.5rem",
        // have the text be centered
        textAlign: "center",
      }}
    >
      {timeCal} <br />
      <img
        src={`http://openweathermap.org/img/w/${icon}.png`}
        onClick={() => setOpen(!open)}
        onDragStart={handleDragStart}
        role="presentation"
        aria-controls="example-collapse-text"
        aria-expanded={open}
        style={{
          cursor: "pointer",
          borderColor: "black",
          borderStyle: "solid 0.05px",
          // have the text be away from the edges of the card
          padding: "0.5rem",
          // have the text be centered
          textAlign: "center",
        }}
      />
      <p>{hourMins}</p>
      <Collapse in={open}>
        <div id="example-collapse-text">
          {description}
          <br />
          Temperature: {temp}°C
        </div>
      </Collapse>
    </div>
  );
}

export default SearchBar;
