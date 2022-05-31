import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import UserWeather from "../../components/UserWeather/Userweather";
import "./Weather.css";
import rain from "../../videos/rain.mp4";
// import Wea

const Weather = () => {
  const [user, token] = useAuth();
  const [customerInfo, setCustomerInfo] = useState([]);

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

  // // display
  return (
    <section className="weather-page">
      <video autoPlay loop muted className="bg-video-weather">
        <source src={rain} type="video/mp4" />
      </video>
      <div className=" title-section">
        <h2 className="nop">
          <img
            className="letter"
            src="https://img.icons8.com/clouds/250/fa314a/wrauter.png"
          />
          eather
        </h2>
      </div>
      <div className="weather-body">
        {customerInfo.length > 0 && <UserWeather user={customerInfo} />}
      </div>
    </section>
  );
};

export default Weather;
