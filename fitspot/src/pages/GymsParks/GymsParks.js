import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./GymsParks.css";
import axios from "axios";
import FindGymsParks from "../../components/FindGymsParks/FindGymsParks";

const GymsParks = () => {
  const [user, token] = useAuth();
  const [customerInfo, setCustomerInfo] = useState([]);
  // useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       let response = await axios.get(
  //         "http://127.0.0.1:8000/api/parksgyms/allpgratings/planet/",
  //         {
  //           headers: {
  //             Authorization: "Bearer " + token,
  //           },
  //         }
  //       );

  //       setCustomerInfo(response.data);
  //     } catch (error) {
  //       console.log(error.response.data);
  //     }
  //   };
  //   getUser();
  // }, [token]);

  // console.log(customerInfo);
  http: return (
    <section>
      <div className="gptitle-section">
        <div className="colorbox">
          <h2>Gyms</h2>
          <img
            className="gp ampersand"
            src="https://img.icons8.com/stickers/50/000000/ampersand.png"
          />
          <h2>Parks</h2>
        </div>
      </div>
      <p className="gympic"></p>

      <FindGymsParks />
    </section>
  );
};

export default GymsParks;
