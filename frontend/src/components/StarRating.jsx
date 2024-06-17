import { useState } from "react";

const StarRating = ({ rating, setRating }) => {
  const handleRatingClick = (index) => {
    setRating(rating === index + 1 ? 0 : index + 1);
  };

  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          aria-hidden="true"
          focusable="false"
          fill="currentColor"
          stroke="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="0"
          className={`size-6 cursor-pointer ${
            index < rating ? "text-amber-500" : "text-gray-400"
          }`}
          onClick={() => handleRatingClick(index)}
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
