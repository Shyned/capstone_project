import React from "react";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "./SelectedPlace.css";
import { Rating } from "react-simple-star-rating";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const SelectedPlace = (props) => {
  const [mylocal, setMyLocal] = useState(props.mainPlace);
  const [rating, setRating] = useState(0); // initial rating value
  const [mainData, setMainData] = useState([]);
  const [comments, setComments] = useState([]);
  // Change to true when reqest returns obect
  const [hasMain, setHasMain] = useState(false);
  const [user, token] = useAuth();
  // bootstrap modal
  const [show, setShow] = useState(false);
  const values = [true];
  const [fullscreen, setFullscreen] = useState(true);
  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }
  // {mylocal} planet in slot just testing
  useEffect(() => {
    const getComments = async () => {
      try {
        let response = await axios.get(
          `http://127.0.0.1:8000/api/parksgyms/allpgratings/planet/`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        setComments(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getComments();
  }, [mylocal]);
  console.log(comments);

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
  http: return (
    <section className="mainPlace">
      {hasMain == false && (
        <Spinner
          animation="grow"
          variant="warning"
          className="grow-border-lg"
          style={{ width: "20rem", height: "20rem" }}
        />
      )}{" "}
      <button
        key={true}
        className="see-comment"
        onClick={() => handleShow(values)}
      >
        See comments
      </button>
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        {comments.length === 0 && <Modal.Body>No Comments Found</Modal.Body>}

        {comments.length > 0 && (
          <Modal.Body className="scroll-modal-bd">
            {comments.map((el) => {
              return (
                <div className="comment-box">
                  <h2>{el.user.user_name}</h2>
                  <h4>{el.comment}</h4>
                  <h5>{el.rating}</h5>
                </div>
              );
            })}
          </Modal.Body>
        )}
      </Modal>
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
            <form>
              {" "}
              <Rating
                className="rate"
                onClick={handleRating}
                ratingValue={rating} /* Available Props */
              />
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
