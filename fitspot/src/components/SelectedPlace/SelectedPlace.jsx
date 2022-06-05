import React from "react";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "./SelectedPlace.css";
import { Rating } from "react-simple-star-rating";

const SelectedPlace = () => {
  const [main, setMain] = useState([]);
  //Post comment

  http: return (
    <section className="mainPlace">
      <Card className="bg-dark text-white">
        <Card.Img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6IxTX-JPznpxMrXpnuzvkjXxDrD4B09UMkLPnCEMxPcINK9pFguK_IFt7I5ADyWMjlak&usqp=CAU"
          alt="Card image"
        />
        <Card.ImgOverlay>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </Card.Text>
          <Card.Text>Last updated 3 mins ago</Card.Text>
        </Card.ImgOverlay>
      </Card>
      <form>
        <Rating
        //   onClick={handleRating}
        //   ratingValue={rating} /* Available Props */
        />
        <textarea placeholder="Comment" className="comment-area"></textarea>
        <button type="submit" className="comment-button">
          Submit
        </button>
      </form>
    </section>
  );
};

export default SelectedPlace;
