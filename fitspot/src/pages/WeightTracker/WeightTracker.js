import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
// style
import "./WeightTracker.css";
import axios from "axios";
import CalculateBmi from "../../components/calculate_bmi/calculate_bmi";
import WeightJourney from "../../components/WeigthJourney/WeigthJourney";
import WeightEntry from "../../components/WeightEntry/WeightEntry";

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
  console.log(customerInfo);
  return (
    <section>
      <div className="title">
        <h2>{user.first_name}'s Weight Tracker</h2>
        <img
          className="wt-logo"
          src="https://img.icons8.com/external-wanicon-lineal-color-wanicon/64/fa314a/external-weight-supermarket-wanicon-lineal-color-wanicon.png"
        />
      </div>
      {customerInfo.length > 0 && <CalculateBmi weight={customerInfo} />}
      {customerInfo.length > 0 && <WeightJourney weight={customerInfo} />}
      {customerInfo.length > 0 && <WeightEntry user={customerInfo} />}
    </section>
  );
};

export default WeightTracker;
