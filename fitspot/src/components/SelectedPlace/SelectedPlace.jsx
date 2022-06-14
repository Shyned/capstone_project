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
  const [comments, setComments] = useState([]);
  // Change to true when reqest returns obect
  const [user, token] = useAuth();
  // bootstrap modal
  const [show, setShow] = useState(false);
  const values = [true];
  const [fullscreen, setFullscreen] = useState(true);
  //handle comment change
  const [userComment, setUserComment] = useState([]);
  console.log(mylocal);
  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }
  console.log(mylocal[0].google_id);

  //handle post request
  async function postrating(event) {
    event.preventDefault();
    try {
      let response = await axios.post(
        "http://127.0.0.1:8000/api/parksgyms/rateplace/",
        {
          user: user.first_name,
          gym_park_id: mylocal[0].google_id,
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
  //get comments
  useEffect(() => {
    const getComments = async () => {
      try {
        let response = await axios.get(
          `http://127.0.0.1:8000/api/parksgyms/allpgratings/${mylocal[0].google_id}/`,
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
  }, [show]);

  //star rating
  const handleRating = (rate) => {
    setRating(rate);
  };
  console.log(comments);
  http: return (
    <section className="mainPlace">
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
      {true === true && (
        <div>
          <Card className="bg-dark text-white">
            <Card.Img src="https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?cs=srgb&dl=pexels-william-choquette-1954524.jpg&fm=jpg" />
            <Card.ImgOverlay>
              <Card.Title>
                <h3 className="card-title">{mylocal[0].name}</h3>
              </Card.Title>
              <Card.Text className="card-body-main">
                <a target="_blank" href={mylocal[0].place_link}>
                  {mylocal[0].full_address}
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
