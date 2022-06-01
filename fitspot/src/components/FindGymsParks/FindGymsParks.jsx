import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./FindGymsParks.css";
import axios from "axios";
import swim from "../../videos/swim.mp4";
import { GoogleMap, useloadScript, Maker } from "@react-google-maps/api";

const FindGymsParks = (props) => {
  const [user, token] = useAuth();
  const [userLocaton, setUserLocaton] = useState([]);
  const [localPlaces, setLocalPlaces] = useState([]);
  const number = props.myuser.length - 1;
  const [highestRating, setHighestRating] = useState(0);
  //
  // get coordinates

  useEffect(() => {
    const axios = require("axios");

    const options = {
      method: "GET",
      url: "https://us-zip-code-information.p.rapidapi.com/",
      params: { zipcode: props.myuser[number].zip_code },
      headers: {
        "X-RapidAPI-Host": "us-zip-code-information.p.rapidapi.com",
        "X-RapidAPI-Key": "f635c5492emshb2e6721adc62d5fp1c5272jsn1187fe17f294",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setUserLocaton(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [token]);

  //
  // google maps

  useEffect(() => {
    if (userLocaton.length > 0) {
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
        data: `{"limit":3,"language":"en","region":"us","queries":["park near ${userLocaton[0].ZipCode}","gym near ${userLocaton[0].ZipCode}"],"coordinates":"37.381315,-122.046148"}`,
      };
      axios
        .request(options)
        .then(function (response) {
          setHighestRating(response.data.response.places[0]);
          setLocalPlaces(response.data.response.places);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [userLocaton]);

  return (
    <section className="findppg-com">
      <h2 className="mpg-title-card">MY Local Parks and Gyms</h2>
      {localPlaces.length > 0 && (
        <div>
          <div className=" main-card">
            <h3>{highestRating.name}</h3>
            <video autoPlay loop muted className="main-gym">
              <source src={swim} type="video/mp4"></source>
            </video>
            <div className="info-section">
              <a id="top-rating" href={highestRating.owner_link}>
                {highestRating.full_address}
              </a>
              <p>Rating: {highestRating.rating}</p>
            </div>
          </div>
          <div className="feature-section">
            {localPlaces.map((el) => (
              <div className="feature-card" key={el.id}>
                <h3 className="feature-title-card">{el.name}</h3>
                <img
                  className="feature-icon"
                  src="https://img.icons8.com/stickers/60/undefined/exercise.png"
                />
                <div className="info-sectionf">
                  <a className="info-local" href={el.owner_link}>
                    {el.full_address}
                  </a>
                  <p className="rating-feature">Rating: {el.rating}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default FindGymsParks;
