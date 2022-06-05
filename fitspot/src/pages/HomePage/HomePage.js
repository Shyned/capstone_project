import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./HomePage.css";
import homebg from "../../videos/homebg.mp4";
import Birthday_check from "../../components/birthday_check/birthday_check";

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
  console.log(user.first_name);
  return (
    <section className="home-page">
      <video autoPlay loop muted className="bg-video">
        <source src={homebg} type="video/mp4" />
      </video>
      <h1 className="welcome-user">Welcome {user.first_name}</h1>
      <div className="inspire-area">
        {" "}
        <h2 className="quote">{quote}</h2>
      </div>
      {/* <Birthday_check /> */}
    </section>
  );
};
export default HomePage;
