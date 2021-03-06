import React from "react";

// Rearrange date value to get the order you want... also replace / with a cooler separator like ⋅
export default function Birthday_check() {
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const birth = new Date();
  const birthdate = `${birth.getDate()}/${birth.getMonth() + 1}`;

  console.log(birthdate);
  return (
    <div className="birthday_check">
      <h1>Current date is {date}</h1>
    </div>
  );
}
