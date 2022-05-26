import React, { useState, useEffect } from "react";

const CalculateBmi = (props) => {
  const [weight, setWeight] = useState([]);
  const [listSize, setListSize] = useState([]);
  const user = props.weight;
  console.log(user);
  const myweight = props.weight.length;

  return (
    <section>
      <>{}</>
    </section>
  );
};

export default CalculateBmi;
