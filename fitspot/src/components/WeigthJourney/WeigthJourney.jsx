import React, { useState, useEffect } from "react";
import "./WeigthJourney.css";

const WeightJourney = (props) => {
  console.log(props.weight);

  return (
    <div className=" weights">
      <div className="weight-header">
        <h1 className="wj-title">Weight Journey</h1>
      </div>

      {props.weight != undefined &&
        props.weight.map((el) => {
          return (
            <h5 className="pastweight" key={el.id}>
              {el.current_weight} lbs
            </h5>
          );
        })}
    </div>
  );
};

export default WeightJourney;
