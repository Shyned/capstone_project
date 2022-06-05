import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import "./weight_chart.css";
const Weight_chart = (props) => {
  const user = props.weight;
  const userArray = user.length - 1;
  console.log(user[userArray]);

  const dataNew = [
    ["Name", "Weight"],
    [user[0].user.first_name, user[userArray].weight_goal],
  ];

  const dataOld = [
    ["Name", "goal"],
    [user[0].user.first_name, user[userArray].current_weight],
  ];

  const diffdata = {
    old: dataOld,
    new: dataNew,
  };
  console.log(user[0].user.first_name);
  const options = {
    legend: { position: "none" },
    colors: ["lightblue"],
    backgroundColor: "none",
  };

  return (
    <section className="weightgraph">
      <h2 className="graph-title">
        {user[userArray].current_weight - user[userArray].weight_goal} lbs away
        from goal
      </h2>
      <Chart
        className="progess-chart"
        chartType="BarChart"
        width="100%"
        height="300px"
        diffdata={diffdata}
        options={options}
      />
    </section>
  );
};
export default Weight_chart;
