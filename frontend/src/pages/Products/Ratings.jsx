import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Ratings = ({ value, text }) => {
  const getColor = (rating) => {
    const red = Math.min(255, (1 - rating / 5) * 255);
    const green = Math.min(255, (rating / 5) * 255);
    return `rgb(${red}, ${green}, 0)`;
  };

  return (
    <div className="flex items-center">
      <div
        className="flex items-center px-2 rounded-lg mr-2"
        style={{ backgroundColor: getColor(value) }}
      >
        <span className="text-white text-lg font-semibold">
          {value.toFixed(1)}
        </span>
      </div>
      <span className="text-lg font-medium">{text && text}</span>
    </div>
  );
};

export default Ratings;
