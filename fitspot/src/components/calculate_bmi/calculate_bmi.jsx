import React, { useState, useEffect } from "react";
import "./CalculateBmi.css";

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

  return (
    <section className="bmi-section">
      <div className="bmi-header">
        <h3 className="bmi-name">
          BMI
          <img
            className="bmi-icon"
            src="https://img.icons8.com/plasticine/50/000000/diamond-heart.png"
          />
        </h3>
      </div>
      {myBmi != undefined && (
        <div className="result-section">
          <h4 className="bmi-result"> {myBmi.bmi}</h4>
        </div>
      )}
    </section>
  );
};

export default CalculateBmi;
