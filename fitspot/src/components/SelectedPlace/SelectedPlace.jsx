import React from "react";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "./SelectedPlace.css";
import { Rating } from "react-simple-star-rating";
import Spinner from "react-bootstrap/Spinner";

const SelectedPlace = (props) => {
  const [mylocal, setMyLocal] = useState(props.mainPlace);
  const [rating, setRating] = useState(0); // initial rating value
  const [mainData, setMainData] = useState([]);

  const [hasMain, setHasMain] = useState(false);

  console.log(typeof mylocal);
  // google api
  useEffect(() => {
    {
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
        data: `{"limit":5,"language":"en","region":"us","queries":[" ${mylocal}"],"coordinates":"37.381315,-122.046148","photos_limit": 1}`,
      };
      axios
        .request(options)
        .then(function (response) {
          console.log(response.data.response);
          setMainData(response.data.response.places);
          setHasMain(true);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [mylocal]);

  //Post comment
  const handleRating = (rate) => {
    setRating(rate);
  };
  console.log(mainData);
  http: return (
    <section className="mainPlace">
      {hasMain == false && (
        <Spinner
          animation="grow"
          variant="warning"
          className="grow-border-lg"
          style={{ width: "20rem", height: "20rem" }}
        />
      )}
      {hasMain == true && (
        <div>
          <Card className="bg-dark text-white">
            <Card.Img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6IxTX-JPznpxMrXpnuzvkjXxDrD4B09UMkLPnCEMxPcINK9pFguK_IFt7I5ADyWMjlak&usqp=CAU"
              alt="Card image"
            />
            <Card.ImgOverlay>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
              <Card.Text>Last updated 3 mins ago</Card.Text>
            </Card.ImgOverlay>
          </Card>

          <div className="rate-comment">
            <Rating
              className="rate"
              onClick={handleRating}
              ratingValue={rating} /* Available Props */
            />
            <form>
              <textarea
                placeholder="Comment"
                className="comment-area"
              ></textarea>
              <button type="submit" className="comment-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default SelectedPlace;
