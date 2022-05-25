import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./WeightTracker.css";
import axios from "axios";
// line chart
const WeightTracker = () => {
  const [user, token] = useAuth();
  const [customerInfo, setCustomerInfo] = useState([]);
  const [bmi, setBmi] = useState([]);

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
  }, [user]);
  console.log(customerInfo);

  // user bmi
  // useEffect(() => {
  //   const userBmi =
  //     (customerInfo.current_weight * 703) /
  //     (customerInfo.height * customerInfo.height);
  //   setBmi(userBmi);
  // }, [user]);
  //
  return (
    <section>
      <h3>{user.username}'s Weight Journey</h3>
      <p>Weight Goal</p>
      <p>{customerInfo.weight_goal}</p>
      <p>BMI</p>
      <p>{}</p>

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
