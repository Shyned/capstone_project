import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./Exercise.css";
import exercisevid from "../../videos/exercisevid.mp4";
import FindExercise from "../../components/FindExercise/FindExercise";

import axios from "axios";

const Exercise = () => {
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
