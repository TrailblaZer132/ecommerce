import { useState } from "react";
import img1 from "../Utils/images/img1.jpg";
import img2 from "../Utils/images/img2.jpg";

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [img1, img2]; // Add more images if needed

  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      id="animation-carousel"
      className="relative w-full mx-auto "
      style={{ maxWidth: "97%", marginBottom: "3%", marginLeft: "1.5%" }}
      data-carousel="static"
    >
      <br />
      <div className="relative h-28 overflow-hidden md:h-48">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full object-cover transition-transform ease-in-out duration-500 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            } ${
              index === activeIndex
                ? "transform translate-x-0"
                : "transform translate-x-full"
            }`}
          >
            <img
              src={image}
              className="w-full h-full object-contain"
              alt={`Carousel ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
        onClick={prevSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 group-hover:opacity-100">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
        onClick={nextSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 group-hover:opacity-100">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default Slider;
