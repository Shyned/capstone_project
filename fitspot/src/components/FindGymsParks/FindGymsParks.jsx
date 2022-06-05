import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./FindGymsParks.css";
import Card from "react-bootstrap/Card";

const FindGymsParks = (props) => {
  const [user, token] = useAuth();
  const [userLocaton, setUserLocaton] = useState([]);
  const [localPlaces, setLocalPlaces] = useState([]);
  const [mainPlace, setMainPlace] = useState([]);

  const number = props.myuser.length - 1;
  //
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // get coordinates

  useEffect(() => {
    const axios = require("axios");

    const options = {
      method: "GET",
      url: "https://us-zip-code-information.p.rapidapi.com/",
      params: { zipcode: props.myuser[number].zip_code },
      headers: {
        "X-RapidAPI-Host": "us-zip-code-information.p.rapidapi.com",
        "X-RapidAPI-Key": "f635c5492emshb2e6721adc62d5fp1c5272jsn1187fe17f294",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setUserLocaton(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);
  //
  // google maps

  useEffect(() => {
    if (userLocaton.length > 0) {
      const axios = require("axios");

      const options = {
        method: "POST",
        url: "https://google-maps-search1.p.rapidapi.com/search",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Host": "google-maps-search1.p.rapidapi.com",
          "X-RapidAPI-Key":
            "f635c5492emshb2e6721adc62d5fp1c5272jsn1187fe17f294",
        },
        data: `{"limit":5,"language":"en","region":"us","queries":["park near ${userLocaton[0].ZipCode}","gym near ${userLocaton[0].ZipCode}"],"coordinates":"37.381315,-122.046148","photos_limit": 1}`,
      };
      axios
        .request(options)
        .then(function (response) {
          console.log(response.data.response.places);
          setLocalPlaces(response.data.response.places);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [userLocaton]);
  console.log(localPlaces.length);
  // card - cardimg - cardbody - cardbody - card title - card text- cardfooter
  return (
    <section className="caro-gp">
      {/* {localPlaces.length > 0 &&
        localPlaces.map((el) => (
          <Card className="pg-card" bg="light">
            <Card.Img
              variant="top"
              src={el.photos_sample[0].large_photo_url}
              alt="picture of gym or park"
              className="park"
            />
            <Card.Body>
              <Card.Title>{el.name}</Card.Title>
              <Card.Text>Rating {el.rating}</Card.Text>
            </Card.Body>{" "}
            <Card.Footer>
              <small className="text-muted">
                <button
                  className="pg-button"
                  onClick={() => setMainPlace(el.full_address)}
                >
                  Select
                </button>
              </small>
            </Card.Footer>
          </Card>
        ))} */}
    </section>
  );
};
//
export default FindGymsParks;
