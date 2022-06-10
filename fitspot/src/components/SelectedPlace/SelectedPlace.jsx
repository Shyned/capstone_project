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
  var mylocal = props.selected;
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
  //handle comment change
  const [userComment, setUserComment] = useState([]);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }
  console.log(mylocal);
  //handle post request
  async function postrating(event) {
    event.preventDefault();
    try {
      let response = await axios.post(
        "http://127.0.0.1:8000/api/parksgyms/rateplace/",
        {
          user: user.first_name,
          gym_park_id: mylocal,
          rating: rating,
          comment: userComment,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response.data);
      alert("Entry Posted");
    } catch (error) {
      console.log(error.response.data);
    }
  }
  // {mylocal} planet in slot just testing
  useEffect(() => {
    const getComments = async () => {
      try {
        let response = await axios.get(
          `http://127.0.0.1:8000/api/parksgyms/allpgratings/${mylocal}/`,
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

  // google api

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
            <Card.Img src="https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?cs=srgb&dl=pexels-william-choquette-1954524.jpg&fm=jpg" />
            <Card.ImgOverlay>
              <Card.Title>
                <h3 className="card-title">{mainData[0].name}</h3>
              </Card.Title>
              <Card.Text className="card-body-main">
                <a target="_blank" href={mainData[0].place_link}>
                  {mainData[0].full_address}
                </a>
              </Card.Text>
            </Card.ImgOverlay>
          </Card>

          <div className="rate-comment">
            <form onSubmit={postrating}>
              {" "}
              <Rating
                className="rate"
                onClick={handleRating}
                ratingValue={rating} /* Available Props */
              />
              <textarea
                placeholder="Comment"
                className="comment-area"
                onChange={(event) => setUserComment(event.target.value)}
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
