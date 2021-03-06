import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import "./SavedWorkOuts.css";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Offcanvas from "react-bootstrap/Offcanvas";

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

  // offcanvas
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <section className="Workout-log">
      <div className="hold-btn">
        <button
          type="button"
          className="btn btn-outline-primary work-log"
          onClick={handleShow}
        >
          Workout Log
        </button>
      </div>
      <Offcanvas show={show} onHide={handleClose} placement="bottom">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Workout Log</Offcanvas.Title>
        </Offcanvas.Header>{" "}
        <Offcanvas.Body>
          {" "}
          <div className="table-responsive">
            <Table
              striped
              bordered
              hover
              variant="dark"
              responsive="xl"
              className="table"
            >
              <thead>
                <tr>
                  <th>Workout</th>
                  <th>Reps</th>
                </tr>
              </thead>

              {workouts != undefined &&
                workouts.map((el) => (
                  <tbody>
                    <tr>
                      <td>{el.exercise_id}</td>
                      <td>{el.reps}</td>
                    </tr>
                  </tbody>
                ))}
            </Table>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </section>
  );
};

export default SavedWorkOuts;
