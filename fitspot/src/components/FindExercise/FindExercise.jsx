import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./FindExercise.css";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const FindExercise = () => {
  const [bodyPart, setBodyPart] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [bodyPartsSearch, setBodyPartsSearch] = useState([]);
  const [equipmentSearch, setequipmentSearch] = useState([]);
  const [hasItem, setHasItem] = useState(false);
  const [user, token] = useAuth();
  // saved post
  const [pickedExercsie, setPickedExercise] = useState([]);
  const [myReps, setMyReps] = useState([]);

  function addWorkout(event) {
    event.preventDefault();
    const getUser = async () => {
      try {
        console.log(myReps);
        console.log(pickedExercsie);
        let response = await axios.post(
          "http://127.0.0.1:8000/api/workouts/addworkout/",
          {
            user: user.first_name,
            reps: myReps,
            exercise_id: pickedExercsie,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getUser();
  }

  function SearchBody(event) {
    event.preventDefault();
    const axios = require("axios");

    const options = {
      method: "GET",
      url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
      headers: {
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
        "X-RapidAPI-Key": "f635c5492emshb2e6721adc62d5fp1c5272jsn1187fe17f294",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setBodyPartsSearch(response.data);
        setHasItem(true);
      })
      .catch(function (error) {
        console.error(error);
      });
    setBodyPart(" ");
  }

  useEffect(() => {
    if (hasItem === true) {
      const founditems = bodyPartsSearch.filter(
        (element) => element.equipment === equipment
      );

      setequipmentSearch(founditems);
    }
    setEquipment(" ");
    setHasItem(false);
  }, [hasItem]);
  console.log(pickedExercsie);
  // modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <section className="find-exercise">
      <h2 className="section_title">Find A Exercises</h2>
      <form onSubmit={SearchBody} className="bodypart-form">
        <label className="section_title">Search Body Parts</label>
        <div>
          <select
            className="bpbox"
            value={bodyPart}
            onChange={(e) => setBodyPart(e.target.value)}
          >
            <option value={""}></option>
            <option>back</option>
            <option>cardio</option>
            <option>chest</option>
            <option>lower arms</option>
            <option>lower legs</option>
            <option>neck</option>
            <option>shoulders</option>
            <option>upper arms</option>
            <option>upper legs</option>
            <option>waist</option>
          </select>
        </div>
        <label className="section_title">Search by Equipment</label>
        <div>
          <select
            className="bpbox"
            value={equipment}
            onChange={(event) => setEquipment(event.target.value)}
          >
            <option value={""}></option>
            <option>assisted</option>
            <option>band</option>
            <option>barbell</option>
            <option>body weight</option>
            <option>bosu ball</option>
            <option>cable</option>
            <option>dumbbell</option>
            <option>elliptical machine</option>
            <option>ez barbell</option>
            <option>hammer</option>
            <option>kettlebell</option>
            <option>leverage machine</option>
            <option>medicine ball</option>
            <option>olympic barbell</option>
            <option>resistance band</option>
            <option>roller</option>
            <option>rope</option>
            <option>skierg machine</option>
            <option>sled machine</option>
            <option>smith machine</option>
            <option>stability ball</option>
            <option>stationary bike</option>
            <option>stepmill machine</option>
            <option>tire</option>
            <option>trap bar</option>
            <option>upper body ergometer</option>
            <option>weighted</option>
            <option>wheel roller</option>
          </select>
        </div>
        <button
          variant="primary"
          size="lg"
          className="search-ex"
          onClick={handleShow}
        >
          Search
        </button>
      </form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            <label className="section_title">
              Workouts{" "}
              <img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/30/000000/external-gym-fitness-and-healthy-living-flaticons-lineal-color-flat-icons-3.png" />
            </label>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {equipmentSearch.length === 0 && (
            <div>
              <Spinner animation="grow" variant="warning" />{" "}
              <span className="loading">Nothing Found ...</span>
            </div>
          )}
          {equipmentSearch.length > 0 && (
            <form className="display-result" onSubmit={addWorkout}>
              <label>Exercises</label>
              <select
                className="found-ex"
                value={pickedExercsie}
                onChange={(event) => setPickedExercise(event.target.value)}
              >
                <option></option>
                {equipmentSearch.map((el) => (
                  <option value={el.name}>{el.name}</option>
                ))}
              </select>
              <label>Reps</label>
              <input
                placeholder="1"
                onChange={(event) => setMyReps(event.target.value)}
                type="number"
              />
              <Modal.Footer>
                <button>Submit</button>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </form>
          )}
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default FindExercise;
