import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import "./WeightEntry.css";

const WeightEntry = (props) => {
  const [user, token] = useAuth();
  const [weight, setweight] = useState([]);
  const [weigthGoal, setWeightGoal] = useState([]);
  const [height, setHeight] = useState([]);
  const [birthday, setBirthday] = useState([]);
  const [postedweight, setPostedweight] = useState([]);

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
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getUser();
  }

  return (
    <form id="form" onSubmit={handlesubmit}>
      <h3>Enter weight</h3>
      <div className="WT-label">
        <label>Weight</label>
        <input
          type="text"
          className="input-search"
          value={weight}
          placeholder="Enter Weight (lbs)"
          onChange={(event) => setweight(event.target.value)}
        />
        <label>Weight Goal</label>
        <input
          type="text"
          className="input-search"
          value={weigthGoal}
          placeholder="Enter Weight Goal (lbs) "
          onChange={(event) => setWeightGoal(event.target.value)}
        />
        <label>Birthday</label>
        <input
          type="text"
          className="input-search"
          value={birthday}
          placeholder="yyyy-mm-dd"
          onChange={(event) => setBirthday(event.target.value)}
        />
        <label>Height</label>
        <input
          type="text"
          className="input-search"
          value={height}
          placeholder="Enter Height (inches)"
          onChange={(event) => setHeight(event.target.value)}
        />
        <button className="search-button" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default WeightEntry;
