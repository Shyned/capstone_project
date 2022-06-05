import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useEffect, useState } from "react";
// import pages
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <h3 className="nav-title">
        <img
          className="nav-logo"
          src="https://img.icons8.com/external-flaticons-flat-flat-icons/40/000000/external-fitness-quarantine-flaticons-flat-flat-icons.png"
        />{" "}
        FitSpot
      </h3>
      <a className="nav-link nav-a" href="http://localhost:3000/">
        Home
      </a>

      {/* <a className="li" href="http://localhost:3000/about">
        About
      </a> */}

      <a className="nav-link nav-a" href="http://localhost:3000/exercise">
        My Exercise
      </a>

      <a className="nav-link nav-a" href="http://localhost:3000/weighttracker">
        Weight Tracker
      </a>

      <a className="nav-link nav-a" href="http://localhost:3000/weather">
        Weather
      </a>

      <a className="nav-link nav-a" href="http://localhost:3000/gymsparks">
        My Gyms/Parks
      </a>

      {user ? (
        <button type="button" className="btn btn-warning" onClick={logoutUser}>
          Logout
        </button>
      ) : (
        <button className="btn btn-warning" onClick={() => navigate("/login")}>
          Login
        </button>
      )}
    </nav>
  );
};

export default Navbar;
