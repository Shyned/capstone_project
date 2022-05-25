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
    const options = {
      method: "GET",
      url: "https://bodybuilding-quotes1.p.rapidapi.com/random-quote",
      headers: {
        "X-RapidAPI-Host": "bodybuilding-quotes1.p.rapidapi.com",
        "X-RapidAPI-Key": "4caf133187msh2140ca04eeec8dfp133b01jsn478ed078f54d",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setQuote(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <section>
      <video autoPlay loop muted className="bg-video">
        <source src={homebg} type="video/mp4" />
      </video>
      <h1>Welcome {user.username}</h1>{" "}
      <div className="inspire-area">
        <h2>{quote.author}</h2>
        <h2>{quote.quote}</h2>
      </div>
    </section>
  );
};
export default HomePage;
