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
      <ul>
        <li className="li">
          <Link to="/">
            <b>Home</b>
          </Link>
          <a
            href="#"
            className="drop-down-button"
            onClick={() => setOpen(!open)}
          >
            dropdown
          </a>
        </li>
        <li>
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
