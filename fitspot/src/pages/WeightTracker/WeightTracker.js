import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./WeightTracker.css";
import axios from "axios";
import CalculateBmi from "../../components/calculate_bmi/calculate_bmi";
import GraphWeight from "../../components/GraphWeight/GraphWeight";
// line chart
const WeightTracker = () => {
  const [user, token] = useAuth();
  const [customerInfo, setCustomerInfo] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        let response = await axios.get(
          "http://127.0.0.1:8000/api/weighttracker/userinfo/",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setCustomerInfo(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getUser();
  }, []);

  return (
    <section>
      <h3>{user.username}'s Weight Journey</h3>
      <b>BMI</b>
      {customerInfo.length > 0 && <CalculateBmi weight={customerInfo} />}
      {customerInfo.length > 0 && <GraphWeight weight={customerInfo} />}
      <div className="postweight-card">
        <p className="weight-title">Weight Goals</p>
        <input></input>
        <p className="weight-title">Weight</p>
        <input></input>
        <p className="weight-title">Height</p>
        <input></input>
        <button>SUBMIT</button>
      </div>
    </section>
  );
};

export default WeightTracker;
