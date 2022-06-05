import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import smoke from "../../videos/smoke.mp4";
// style
import "./WeightTracker.css";
import axios from "axios";
import CalculateBmi from "../../components/calculate_bmi/calculate_bmi";
import WeightJourney from "../../components/WeigthJourney/WeigthJourney";
import WeightEntry from "../../components/WeightEntry/WeightEntry";
import Weight_chart from "../../components/Weight_chart/weight_chart";
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
      {" "}
      <video autoPlay loop muted className="weight-bg-video">
        <source src={smoke} type="video/mp4" />
      </video>
      <div className="display-grid">
        {customerInfo.length > 0 && <Weight_chart weight={customerInfo} />}{" "}
        {customerInfo.length > 0 && <CalculateBmi weight={customerInfo} />}
        {customerInfo.length > 0 && <WeightJourney weight={customerInfo} />}
        {customerInfo.length > 0 && <WeightEntry user={customerInfo} />}
      </div>
    </section>
  );
};

export default WeightTracker;
