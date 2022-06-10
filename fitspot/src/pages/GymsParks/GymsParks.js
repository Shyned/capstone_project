import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./GymsParks.css";
import axios from "axios";
import FindGymsParks from "../../components/FindGymsParks/FindGymsParks";
import smoke from "../../videos/smoke.mp4";
import SelectedPlace from "../../components/SelectedPlace/SelectedPlace";
import Spinner from "react-bootstrap/Spinner";

const GymsParks = () => {
  const [user, token] = useAuth();
  const [customerInfo, setCustomerInfo] = useState();

  const [mainPlace, setMainPlace] = useState(
    "0x8640cc204f3ab13f:0x58775d89d045f745"
  );
  const [placeInfo, setPlaceInfo] = useState([]);
  const [hasplace, setHasPlace] = useState(false);
  const [hasobject, setHasobject] = useState(false);
  // google api
  useEffect(() => {
    {
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
        data: `{"limit":5,"language":"en","region":"us","queries":["${mainPlace}"],"coordinates":"37.381315,-122.046148","photos_limit": 1}`,
      };
      axios
        .request(options)
        .then(function (response) {
          console.log(response.data.response);
          setPlaceInfo(response.data.response.places);
          setHasPlace(true);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [mainPlace]);

  useEffect(() => {
    const getUser = async () => {
      try {
        let response = await axios.get(
          "http://127.0.0.1:8000/api/weather/location/",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        setCustomerInfo(response.data);
        setHasobject(true);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getUser();
  }, [user]);
  console.log(customerInfo);
  return (
    <section className="gyms-parks-page">
      <video autoPlay loop muted className="weight-bg-video">
        <source src={smoke} type="video/mp4" />
      </video>

      <div className="gp-flex">
        {placeInfo.length > 0 && <SelectedPlace selected={placeInfo} />}

        {hasobject === true && (
          <FindGymsParks myuser={customerInfo} setMainPlace={setMainPlace} />
        )}
      </div>
    </section>
  );
};

export default GymsParks;
