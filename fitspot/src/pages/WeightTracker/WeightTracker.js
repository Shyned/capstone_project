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
        <div className="topcard-section">
          {customerInfo.length > 0 && <CalculateBmi weight={customerInfo} />}
          {customerInfo.length > 0 && <WeightJourney weight={customerInfo} />}
        </div>
        {customerInfo.length > 0 && <WeightEntry user={customerInfo} />}
      </div>
      <img
        className="apple-img"
        src="https://img.icons8.com/plasticine/150/000000/healthy-eating.png"
      />
      <img
        className="hotpepper-img"
        src="https://img.icons8.com/plasticine/200/000000/chili-pepper.png"
      />
    </section>
  );
};

export default WeightTracker;
