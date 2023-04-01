import React, { useState, useEffect } from "react";

const APIKey = import.meta.env.VITE_API_KEY;

function useWeatherSearch(query) {
  const [weather, setWeather] = useState([]);
  const [currWeather, setCurrWeather] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();
    async function fetchSearchResults() {
      let responseBody = {};
      let currResponseBody = {};
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast/?q=${query}&units=metric&cnt=7&appid=${APIKey}`,
          { signal: controller.signal }
        );
        const currResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast/?q=${query}&units=metric&appid=${APIKey}`,
          { signal: controller.signal }
        );
        currResponseBody = await currResponse.json();
        responseBody = await response.json();
      } catch (e) {
        if (e instanceof DOMException) {
          console.log("== HTTP request cancelled");
        } else {
          setError(true);
          throw e;
        }
      }
      if (!ignore) {
        setLoading(false);
        setError(false);
        setWeather(responseBody || []);
        setCurrWeather(currResponseBody || []);
      }
    }
    if (query) {
      fetchSearchResults();
    }
    return () => {
      controller.abort();
      ignore = true;
    };
  }, [query]);

  // console.log("Weather => ", weather);
  // console.log("Curr weather =>", currWeather);

  return [currWeather, weather, loading, error];
}

export default useWeatherSearch;
