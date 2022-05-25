import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

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
  return (
    <nav className="navbar navbar-light bg-dark">
      <ul>
        <li className="brand">
          <Link to="HomePage" >
            <b>Home</b>
          </Link>
        </li>
        <li className="brand">
          <Link to="/About" >
            <b>About</b>
          </Link>
        </li>
        <li className="brand">
          <Link to="/Weather" >
            <b>Weather</b>
          </Link>
        </li>
        <li className="brand">
          <Link to="/Exercise" >
            <b>Exercise</b>
          </Link>
        </li>
        <li className="brand">
          <Link to="/GymsParks" >
            <b>Gyms/Parks</b>
          </Link>
        </li>
        <li className="brand">
          <Link to="WeightTracker" >
            <b>Weight tracker</b>
          </Link>
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
