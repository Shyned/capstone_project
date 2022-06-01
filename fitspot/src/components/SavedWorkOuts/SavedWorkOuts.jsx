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
  console.log(workouts);
  return (
    <section className="Workout-log">
      <h2 className="workout-box">Workout Log</h2>
      {workouts != undefined &&
        workouts.map((el) => (
          <div className="workouts">
            <div className="items-work" key={el.id}>
              <p className="workputs">Workout : {el.exercise_id}</p>
              <p className="workputs">REPS : {el.reps}</p>
            </div>
            <img
              className="checked-box"
              src="https://img.icons8.com/cute-clipart/40/undefined/checked-checkbox.png"
            />
          </div>
        ))}
    </section>
  );
};

export default SavedWorkOuts;
