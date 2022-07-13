import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
// import pages
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [city, setCity] = useState([]);
  const [state, setState] = useState([]);
  const [zipCode, setZipCode] = useState([]);
  const [myUser, token] = useAuth();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //
  async function changeLocation(event) {
    event.preventDefault();
    try {
      let response = await axios.post(
        "http://127.0.0.1:8000/api/weather/addarea/",
        {
          user: myUser.first_name,
          city: city,
          state: state,
          zip_code: zipCode,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response.data);
      alert("Entry Posted");
      window.reload(true);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={changeLocation}>
            <input
              value={city}
              placeholder="Enter City"
              onChange={(event) => setCity(event.target.value)}
            ></input>
            <input
              value={state}
              placeholder="Enter State"
              onChange={(event) => setState(event.target.value)}
            ></input>
            <input
              value={zipCode}
              placeholder="Enter zipcode"
              onChange={(event) => setZipCode(event.target.value)}
            ></input>{" "}
            <button variant="primary" type="submit">
              Save Changes
            </button>
          </form>
        </Modal.Body>

        <button variant="secondary" onClick={handleClose}>
          Close
        </button>
      </Modal>
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

      <button
        className="nav-link nav-a change"
        variant="primary"
        onClick={handleShow}
      >
        Change Location
      </button>

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
