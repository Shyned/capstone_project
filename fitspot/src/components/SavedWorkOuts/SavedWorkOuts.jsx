import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import "./SavedWorkOuts.css";
import axios from "axios";

const SavedWorkOuts = (props) => {
  const [user, token] = useAuth();
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const WorkoutLog = async () => {
      try {
        let response = await axios.get(
          "http://127.0.0.1:8000/api/workouts/userworks/",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log(response.data);
        setWorkouts(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    WorkoutLog();
  }, [token]);

  return (
    <section>
      <h2>Workout Log</h2>
      {workouts.length > 0 &&
        workouts.map((el) => (
          <p key={el.id}>
            {el.exercise_id} {el.reps}
          </p>
        ))}
    </section>
  );
};

export default SavedWorkOuts;
