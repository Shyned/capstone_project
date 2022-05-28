import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useEffect, useState } from "react";
// import pages
import "./NavBar.css";
// import About from "../../pages/About/About";
// import Exercise from "../../pages/Exercise/Exercsie"
// import GymsParks from "../../pages/GymsParks/GymsParks"
// import HomePage from "../../pages/HomePage/HomePage"
// import Weather from "../../pages/Weather/Weather"
// import WeightTracker from "../../pages/WeightTracker/WeightTracker"

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar navbar-light">
      <a className="li" href="http://localhost:3000/">
        Home
      </a>

      <a className="li" href="http://localhost:3000/about">
        About
      </a>

      <a className="li" href="http://localhost:3000/exercise">
        My Exercise
      </a>

      <a className="li" href="http://localhost:3000/weighttracker">
        Weight Tracker
      </a>

      <a className="li" href="http://localhost:3000/weather">
        Weather
      </a>

      <a className="li" href="http://localhost:3000/gymsparks">
        My Gyms/Parks
      </a>

      {user ? (
        <button className="sign-btn" onClick={logoutUser}>
          Logout
        </button>
      ) : (
        <button className="sign-btn" onClick={() => navigate("/login")}>
          Login
        </button>
      )}
    </nav>
  );
};

export default Navbar;
