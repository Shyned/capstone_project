import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const Weather = () => {
  const [user, token] = useAuth();
  const [customerInfo, setCustomerInfo] = useState([]);
  const [myWeather, setMyWeather] = useState([]);
  // user location info
  // debugger;
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
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getUser();
  }, [token]);
  console.log(customerInfo);

  // weather api

  // {customerInfo.length > 0 &&
  //   const axios = require("axios");

  //   const options = {
  //     method: "GET",
  //     url: "https://yahoo-weather5.p.rapidapi.com/weather",
  //     params: {
  //       location: "houston",
  //       format: "json",
  //       u: "f",
  //     },
  //     headers: {
  //       "X-RapidAPI-Host": "yahoo-weather5.p.rapidapi.com",
  //       "X-RapidAPI-Key": "4caf133187msh2140ca04eeec8dfp133b01jsn478ed078f54d",
  //     },
  //   };

  //   axios
  //     .request(options)
  //     .then(function (response) {
  //       setMyWeather(response.data);
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  // }

  console.log(myWeather);
  // // display
  return (
    <section>
      <h3>{user.username}</h3>

      {/* {myWeather && myWeather.map((el) => <p key={el.id}></p>)} */}
    </section>
  );
};

export default Weather;
