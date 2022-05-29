import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./HomePage.css";
import homebg from "../../videos/homebg.mp4";

const HomePage = () => {
  const [user, token] = useAuth();
  const [quote, setQuote] = useState([]);
  const axios = require("axios");

  useEffect(() => {
    const axios = require("axios");

    const options = {
      method: "POST",
      url: "https://motivational-quotes1.p.rapidapi.com/motivation",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Host": "motivational-quotes1.p.rapidapi.com",
        "X-RapidAPI-Key": "4caf133187msh2140ca04eeec8dfp133b01jsn478ed078f54d",
      },
      data: '{"key1":"value","key2":"value"}',
    };

    axios
      .request(options)
      .then(function (response) {
        setQuote(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [user]);
  console.log(quote);
  return (
    <section className="home-page">
      <h1 className="fitspot">
        <img
          className="svg-logo"
          src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-fitness-quarantine-flaticons-flat-flat-icons.png"
        />
        FitSpot
      </h1>
      <video autoPlay loop muted className="bg-video">
        <source src={homebg} type="video/mp4" />
      </video>

      <div className="inspire-area">
        <h2 className="quote">{quote}</h2>
      </div>
    </section>
  );
};
export default HomePage;
