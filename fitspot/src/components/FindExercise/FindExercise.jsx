import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./FindExercise.css";

const FindExercise = () => {
  const [bodyPart, setBodyPart] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [bodyPartsSearch, setBodyPartsSearch] = useState([]);
  const [equipmentSearch, setequipmentSearch] = useState([]);
  const [hasItem, setHasItem] = useState(false);

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
      console.log(founditems);
      setequipmentSearch(founditems);
    }

    setHasItem(false);
  }, [hasItem]);

  return (
    <section>
      <h1>Find exercise</h1>
      <form onSubmit={SearchBody}>
        <label>Search Body Parts</label>
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
        <label>Search by Equipment</label>
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
            <option></option>"olympic barbell",
            <option></option>"resistance band",
            <option></option>"roller",
            <option></option>"rope",
            <option></option>"skierg machine",
            <option></option>"sled machine",
            <option></option>"smith machine",
            <option></option>"stability ball",
            <option></option>"stationary bike",
            <option></option>"stepmill machine",
            <option></option>"tire",
            <option></option>"trap bar",
            <option></option>"upper body ergometer",
            <option></option>"weighted",
            <option></option>"wheel roller",
          </select>
        </div>
        <button>Submit</button>
      </form>
    </section>
  );
};

export default FindExercise;
