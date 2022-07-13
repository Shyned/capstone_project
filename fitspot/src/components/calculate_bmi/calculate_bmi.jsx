import React, { useState, useEffect } from "react";
import "./CalculateBmi.css";
import Spinner from "react-bootstrap/Spinner";

const CalculateBmi = (props) => {
  const [myBmi, setMyBmi] = useState([]);
  // Varibales
  const user = props.weight;
  const userArray = user.length - 1;
  const userWeight = user[userArray].current_weight.toString();
  const userHeight = user[userArray].height.toString();

  // Get Bmi
  useEffect(() => {
    const axios = require("axios");

    const options = {
      method: "GET",
      url: "https://body-mass-index-bmi-calculator.p.rapidapi.com/imperial",
      params: { weight: userWeight, height: userHeight },
      headers: {
        "X-RapidAPI-Host": "body-mass-index-bmi-calculator.p.rapidapi.com",
        "X-RapidAPI-Key": "f635c5492emshb2e6721adc62d5fp1c5272jsn1187fe17f294",
      },
    };
    axios
      .request(options)
      .then(function (response) {
        setMyBmi(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);
  console.log(myBmi.bmi);

  return (
    <section className="bmi-section">
      <h3 className="bmi-name">BMI</h3>
      {myBmi.bmi ? (
        <h4 className="bmi-result">{Math.trunc(myBmi.bmi)}%</h4>
      ) : (
        <div className="bmiloader">
          <Spinner className="spin" animation="border" variant="warning" />
        </div>
      )}
    </section>
  );
};

export default CalculateBmi;
