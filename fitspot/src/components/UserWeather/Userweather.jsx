import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./UserWeather.css";

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
        console.log(response.data);
        setTravelweather(response.data.current_observation);
      })
      .catch(function (error) {
        console.error(error);
      });
    setTravelCity("");
  }
  console.log(weather);
  return (
    <section className="whole-weather-page">
      {weather != undefined > 0 && (
        <div className="local-weather-area">
          <h2 className="title-card">{props.user[number].city}'s' Weather</h2>
          <div className="top-section">
            <div className="temp-section">
              <h3>
                Temperature{" "}
                <img
                  className="weather-img"
                  src="https://img.icons8.com/external-smashingstocks-flat-smashing-stocks/80/000000/external-temperature-summer-party-smashingstocks-flat-smashing-stocks.png"
                />
              </h3>
              <p className="weather-data">
                {weather.condition.temperature} Degrees
              </p>
            </div>
            <div className="wind-chill-section">
              <h3>
                Wind Chill{" "}
                <img
                  className="weather-img"
                  src="https://img.icons8.com/external-justicon-lineal-color-justicon/80/000000/external-wind-weather-justicon-lineal-color-justicon.png"
                />
              </h3>
              <p className="weather-data">{weather.wind.chill} Degrees</p>
            </div>
          </div>
          <div className="middle-section">
            <div className="humidity-section">
              <h3>
                Humidity{" "}
                <img
                  className="weather-img"
                  src="https://img.icons8.com/external-flaticons-flat-flat-icons/80/000000/external-humidity-plants-flaticons-flat-flat-icons-2.png"
                />
              </h3>
              <p className="weather-data">{weather.atmosphere.humidity}%</p>
            </div>
            <div className="more-weather">
              <h3>
                Weather Conditions
                <img
                  className="weather-img"
                  src="https://img.icons8.com/external-dreamcreateicons-outline-color-dreamcreateicons/80/000000/external-cloudy-weather-dreamcreateicons-outline-color-dreamcreateicons.png"
                />
              </h3>{" "}
              <p className="weather-data">{weather.condition.text}</p>
            </div>
          </div>
        </div>
      )}
      <form className="find-city" onSubmit={getcity}>
        <h2>Travel Weather</h2>
        <label></label>
        <input
          type="text"
          className="input-search"
          value={travelCity}
          placeholder="Enter City"
          onChange={(event) => setTravelCity(event.target.value)}
        />
        <button className="search-button" type="submit">
          Search City
        </button>
      </form>
      <section className="searched-city"></section>

      {travelWeather.condition != undefined && (
        <div className="travel-page">
          <h2 className="weather-report">
            {" "}
            Weather Report{" "}
            <img
              className="weather-img"
              src="https://img.icons8.com/external-smashingstocks-isometric-smashing-stocks/55/000000/external-forecast-weather-smashingstocks-isometric-smashing-stocks.png"
            />
          </h2>
          <h3 className="travel-data">Temperature</h3>
          <p className="weather-data">
            {travelWeather.condition.temperature}{" "}
            <img
              className="weather-img"
              src="https://img.icons8.com/external-prettycons-flat-prettycons/47/000000/external-fahrenheit-weather-prettycons-flat-prettycons.png"
            />
          </p>
          <h3 className="travel-data">Humidity</h3>
          <p className="weather-data">
            {travelWeather.atmosphere.humidity}
            <img
              className="weather-img"
              src="https://img.icons8.com/stickers/60/000000/percentage.png"
            />
          </p>
        </div>
      )}
    </section>
  );
};

export default UserWeather;
