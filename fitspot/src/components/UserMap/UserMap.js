import { GoogleMap, useJsApiLoader, Maker } from "@react-google-maps/api";
import React from "react";
import { useEffect, useState } from "react";
import "./UserMap.css";

const UserMap = (props) => {
  const [hasItem, setHasItem] = useState([]);
  const [pgtravelCity, setpgTravelCity] = useState([]);
  const [gymsParks, setGymsParks] = useState([]);

  function getzip(event) {
    event.preventDefault();
    const axios = require("axios");

    const options = {
      method: "GET",
      url: "https://us-zip-code-information.p.rapidapi.com/",
      params: { zipcode: pgtravelCity },
      headers: {
        "X-RapidAPI-Host": "us-zip-code-information.p.rapidapi.com",
        "X-RapidAPI-Key": "f635c5492emshb2e6721adc62d5fp1c5272jsn1187fe17f294",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setHasItem(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  // get locals gym parks
  useEffect(() => {
    if (hasItem.length > 0) {
      const axios = require("axios");

      const options = {
        method: "POST",
        url: "https://google-maps-search1.p.rapidapi.com/search",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Host": "google-maps-search1.p.rapidapi.com",
          "X-RapidAPI-Key":
            "f635c5492emshb2e6721adc62d5fp1c5272jsn1187fe17f294",
        },
        data: `{"limit":3,"language":"en","region":"us","queries":["park near ${hasItem[0].ZipCode}","gym near ${hasItem[0].ZipCode}"],"coordinates":"37.381315,-122.046148"}`,
      };
      axios
        .request(options)
        .then(function (response) {
          setGymsParks(response.data.response.places);
          setpgTravelCity(" ");
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [hasItem]);
  console.log(gymsParks.length);
  return (
    <section className="searchpaks-form">
      <div>
        <form onSubmit={getzip}>
          <label></label>
          <input
            type="text"
            className="input-search"
            value={pgtravelCity}
            placeholder="zip code of travel"
            onChange={(event) => setpgTravelCity(event.target.value)}
          />
          <button className="search-button" type="submit">
            Search zipcode
          </button>
        </form>
        <div className="searched-city"></div>
      </div>
      <div className="travel-pg-section">
        {gymsParks.length > 0 &&
          gymsParks.map((el) => (
            <div className="travel-parks-gyms">
              <div className="info">
                <h4>{el.name}</h4>
                <a href={el.owner_link}>{el.full_address}</a>
                <p>{el.rating}</p>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default UserMap;
