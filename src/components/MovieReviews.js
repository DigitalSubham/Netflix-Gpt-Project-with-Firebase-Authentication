import React, { useState, useEffect } from "react";
import { GOOGLE_API_KEY } from "../utils/constants";
import ReviewCard from "./ReviewCard";

const MovieReviews = ({ movieName }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const movieRevie = async () => {
      const data = await fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&chart=mostPopular&maxResults=8&regionCode=US&q=${movieName} movie reviews` +
          "&key=" +
          GOOGLE_API_KEY
      );
      const json = await data.json();
      // console.log(json.items);
      setReviews(json.items);
    };

    movieRevie();
  }, [movieName]);

  return (
    <div>
      <div className="flex flex-wrap ml-24">
        {reviews?.map((review, index) => (
          <div key={index}>
            {" "}
            <ReviewCard info={review} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieReviews;
