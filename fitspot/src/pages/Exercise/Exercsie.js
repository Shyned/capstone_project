import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./Exercise.css";
import exercisevid from "../../videos/exercisevid.mp4";
import FindExercise from "../../components/FindExercise/FindExercise";

import axios from "axios";

const Exercise = () => {
  const equipmentoptions = [
    "assisted",
    "band",
    "barbell",
    "body weight",
    "bosu ball",
    "cable",
    "dumbbell",
    "elliptical machine",
    "ez barbell",
    "hammer",
    "kettlebell",
    "leverage machine",
    "medicine ball",
    "olympic barbell",
    "resistance band",
    "roller",
    "rope",
    "skierg machine",
    "sled machine",
    "smith machine",
    "stability ball",
    "stationary bike",
    "stepmill machine",
    "tire",
    "trap bar",
    "upper body ergometer",
    "weighted",
    "wheel roller",
  ];
  // get all exercises
  // const axios = require("axios");

  // const options = {
  //   method: "GET",
  //   url: "https://exercisedb.p.rapidapi.com/exercises",
  //   headers: {
  //     "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  //     "X-RapidAPI-Key": "f635c5492emshb2e6721adc62d5fp1c5272jsn1187fe17f294",
  //   },
  // };

  // axios
  //   .request(options)
  //   .then(function (response) {
  //     console.log(response.data);
  //   })
  //   .catch(function (error) {
  //     console.error(error);
  //   });
  return (
    <section className="exer-page">
      <div className="exercise-title">
        <h2 className="animate__bounce">Exercise</h2>
      </div>

      <video autoPlay loop muted className="maskvid">
        <source
          className="weightvid"
          src={exercisevid}
          type="video/mp4"
        ></source>
      </video>
      <FindExercise />
    </section>
  );
};

export default Exercise;
