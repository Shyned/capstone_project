import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Weather from "../../pages/Weather/Weather";

const UserWeather = (props) => {
  const [weather, setWeather] = useState([]);
  const [travelCity, setTravelCity] = useState([]);
  const [travelWeather, setTravelweather] = useState([]);
  const number = props.user.length - 1;
  console.log(number);

  // weather api
  useEffect(() => {
    const axios = require("axios");

    const options = {
      method: "GET",
      url: "https://yahoo-weather5.p.rapidapi.com/weather",
      params: { location: props.user[number].city, format: "json", u: "f" },
      headers: {
        "X-RapidAPI-Host": "yahoo-weather5.p.rapidapi.com",
        "X-RapidAPI-Key": "f635c5492emshb2e6721adc62d5fp1c5272jsn1187fe17f294",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setWeather(response.data.current_observation);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);
  // get travel weather
  function getcity(event) {
    event.preventDefault();
    console.log(travelCity);
    const axios = require("axios");

    const options = {
      method: "GET",
      url: "https://yahoo-weather5.p.rapidapi.com/weather",
      params: { location: travelCity, format: "json", u: "f" },
      headers: {
        "X-RapidAPI-Host": "yahoo-weather5.p.rapidapi.com",
        "X-RapidAPI-Key": "f635c5492emshb2e6721adc62d5fp1c5272jsn1187fe17f294",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setTravelweather(response.data.current_observation);
      })
      .catch(function (error) {
        console.error(error);
      });
    setTravelCity("");
  }
  console.log(travelWeather);
  return (
    <section>
      <h1>My Weather</h1>
      {weather != undefined > 0 && (
        <div className="local-weather-area">
          <h3>Temp</h3>
          <p>{weather.condition.temperature}</p>
          <h3>humidity</h3>
          <p>{weather.atmosphere.humidity}</p>
        </div>
      )}
      <form onSubmit={getcity}>
        <label>Search Weather</label>
        <input
          type="text"
          className="input-search"
          value={travelCity}
          placeholder="Enter City"
          onChange={(event) => setTravelCity(event.target.value)}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      {travelWeather.condition != undefined && (
        <div>
          <h2> weather</h2>
          <h3>Temp</h3>
          <p>{travelWeather.condition.temperature}</p>
          <h3>humidity</h3>
          <p>{travelWeather.atmosphere.humidity}</p>
        </div>
      )}
    </section>
  );
};

export default UserWeather;
