import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const FindExercise = () => {
  const [bodyPart, setBodyPart] = useState([]);
  const [equipment, setEquipment] = useState([]);
  console.log(bodyPart);
  return (
    <section>
      <h1>Find exercise</h1>
      <select value={bodyPart} onChange={(e) => setBodyPart(e.target.value)}>
        <option value={""}></option>
        <option value={"back"}>back</option>
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
    </section>
  );
};

export default FindExercise;
