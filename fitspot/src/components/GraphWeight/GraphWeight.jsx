import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

export const options = {
  title: "Weight Journey ",
  curveType: "function",
  legend: { position: "bottom" },
  vAxis: { title: "weight", baseline: 100 },
  hAxis: { title: "Date", baseline: 2010 },
  colorAxis: { colors: ["yellow", "red"] },
};
const GraphWeight = (props) => {
  function WeightJourney() {
    let weights = props.weight.map((weight) => {
      return [weight.current_weight];
    });
    const data = [["Current Weight"], ...weights];
    console.log(data);
    return data;
  }

  //   console.log(props.weight);

  return (
    <section>
      <Chart
        className="bubble-chart"
        chartType="BubbleChart"
        width="100%"
        height="400px"
        data={WeightJourney()}
        options={options}
      />
    </section>
  );
};

export default GraphWeight;
