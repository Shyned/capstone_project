import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./GymsParks.css";
import axios from "axios";
import FindGymsParks from "../../components/FindGymsParks/FindGymsParks";
import smoke from "../../videos/smoke.mp4";
import SelectedPlace from "../../components/SelectedPlace/SelectedPlace";
import Spinner from "react-bootstrap/Spinner";
import { useContext } from "react/cjs/react.production.min";
const GymsParks = () => {
  const [user, token] = useAuth();
  const [customerInfo, setCustomerInfo] = useState([]);
  const [mainPlace, setMainPlace] = useState(
    "0x8640cd4c9383f4eb:0x70caee2b4e1ce3d1"
  );

  useEffect(() => {
    const getUser = async () => {
      try {
        let response = await axios.get(
          "http://127.0.0.1:8000/api/weather/location/",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        setCustomerInfo(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getUser();
  }, [token]);
  console.log(customerInfo);
  // console.log(customerInfo);
  http: return (
    <section className="gyms-parks-page">
      <video autoPlay loop muted className="weight-bg-video">
        <source src={smoke} type="video/mp4" />
      </video>

      <div className="gp-flex">
        {<SelectedPlace mainPlace={mainPlace} />}

        {customerInfo.length > 0 && (
          <FindGymsParks myuser={customerInfo} setMainPlace={setMainPlace} />
        )}
      </div>
    </section>
  );
};

export default GymsParks;
