import React from "react";

const ReviewCard = ({ info }) => {
  const { title, thumbnails } = info.snippet;
  return (
    <div className="p-2 m-2 w-72 shadow-red-200 rounded-lg">
      <img className="rounded-lg" alt="thumbnail" src={thumbnails.high.url} />
      <ul>
        <li className="font-bold py-2">{title}</li>
      </ul>
    </div>
  );
};

export default ReviewCard;
