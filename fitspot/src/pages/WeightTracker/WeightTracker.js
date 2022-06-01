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
    <section className="weighttracker-page">
      <img
        className="bg-shape"
        src="https://img.icons8.com/color/6000/undefined/3ds-max.png"
      />
      <div className="title">
        <h2 className="wt-banner">
          {user.first_name}'s Weight Tracker
          <img
            className="wt-logo"
            src="https://img.icons8.com/external-wanicon-lineal-color-wanicon/64/fa314a/external-weight-supermarket-wanicon-lineal-color-wanicon.png"
          />
        </h2>
      </div>
      <div className="body-wt">
        <div className="flex-items">
          {customerInfo.length > 0 && <WeightJourney weight={customerInfo} />}
          <div className="right-section">
            {customerInfo.length > 0 && <WeightEntry user={customerInfo} />}
            {customerInfo.length > 0 && <CalculateBmi weight={customerInfo} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeightTracker;
