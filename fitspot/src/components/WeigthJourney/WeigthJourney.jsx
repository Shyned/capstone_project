import React, { useState, useEffect } from "react";

const WeightJourney = (props) => {
  console.log(props.weight);

  return (
    <div className=" weights">
      <h1>Weight Journey</h1>

      {props.weight != undefined &&
        props.weight.map((el) => {
          return <h5 key={el.id}>{el.current_weight} lbs</h5>;
        })}
    </div>
  );
};

export default WeightJourney;
