import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const WeightEntry = () => {
  const [user, token] = useAuth();
  const [weight, setweight] = useState([]);
  const [weigthGoal, setWeightGoal] = useState([]);
  const [height, setHeight] = useState([]);

  console.log(weight);
  //   function handlesubmit(event) {
  //     event.preventDefault();
  //     let new_reply = {
  //       'user': props.user.user,
  //       'current_weight': weight,
  //       'birthday':props.user.birthday,
  //       'weight_goal': weigthGoal,
  //       'height': height,
  //     };
  //     props.addReply(new_reply);
  //     setText('');
  //   }onSubmit={handlesubmit}
  return (
    <form id="form">
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
