import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import "./WeightEntry.css";
import Offcanvas from "react-bootstrap/Offcanvas";

const WeightEntry = (props) => {
  const [user, token] = useAuth();
  const [weight, setweight] = useState([]);
  const [weigthGoal, setWeightGoal] = useState([]);
  const [height, setHeight] = useState([]);
  const [birthday, setBirthday] = useState([]);
  const [postedweight, setPostedweight] = useState([]);
  console.log(birthday);
  function handlesubmit(event) {
    event.preventDefault();
    let new_weight = {
      user: props.user.user,
      current_weight: weight,
      birthday: props.user.birthday,
      weight_goal: weigthGoal,
      height: height,
    };
    const getUser = async () => {
      try {
        let response = await axios.post(
          "http://127.0.0.1:8000/api/weighttracker/addweight/",
          {
            user: user.first_name,
            current_weight: weight,
            weight_goal: weigthGoal,
            birthday: birthday,
            height: height,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log(response.data);
        setPostedweight(response.data);
        alert("Entry Posted");
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getUser();
  }

  // bootstrap
  const options = [
    {
      name: "Enable both scrolling & backdrop",
      scroll: true,
      backdrop: true,
    },
  ];
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  return (
    <section>
      <div>
        <button variant="primary" onClick={toggleShow} className="me-2">
          Enter Weight
        </button>
        <Offcanvas
          className="offcanvas-menu"
          show={show}
          onHide={handleClose}
          {...props}
        >
          <Offcanvas.Header closeButton></Offcanvas.Header>
          <Offcanvas.Body>
            <form id="enter-form" onSubmit={handlesubmit}>
              <label className="input-label">Weight</label>
              <input
                type="number"
                className="input-search"
                value={weight}
                placeholder="Enter Weight (lbs)"
                onChange={(event) => setweight(event.target.value)}
              />

              <label className="input-label">Weight Goal</label>
              <input
                type="number"
                className="input-search"
                value={weigthGoal}
                placeholder="Enter Weight Goal (lbs) "
                onChange={(event) => setWeightGoal(event.target.value)}
              />

              <label className="input-label">Birthday</label>
              <input
                type="date"
                className="input-search"
                value={birthday}
                placeholder="yyyy-mm-dd"
                onChange={(event) => setBirthday(event.target.value)}
              />

              <label className="input-label">Height</label>
              <input
                type="number"
                className="input-search"
                value={height}
                placeholder="Enter Height (inches)"
                onChange={(event) => setHeight(event.target.value)}
              />

              <button className="add-button" type="submit">
                Submit
              </button>
            </form>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </section>
  );
};

export default WeightEntry;
