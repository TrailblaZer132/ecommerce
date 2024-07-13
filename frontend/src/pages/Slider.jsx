import { useState, useEffect } from "react";
import img1 from "../Utils/images/img1.jpg";
import img2 from "../Utils/images/img2.jpg";
import img3 from "../Utils/images/img3.jpg";
import img4 from "../Utils/images/img4.jpg";
import img5 from "../Utils/images/img5.jpg";
import img6 from "../Utils/images/img6.jpg";
import img7 from "../Utils/images/img7.jpg";
import img8 from "../Utils/images/img8.jpg";
import img9 from "../Utils/images/img9.jpg";
import img10 from "../Utils/images/img10.jpg";

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10]; // Add more images if needed

  const texts = [
    "Beauty of Meghalaya",
    "Famous places in Meghalaya",
    "Stories of Meghalaya",
    "Winds of Meghalaya",
    "Stories of Meghalaya",
    "Beauty of Meghalaya",
    "Famous places in Meghalaya",
    "Stories of Meghalaya",
    "Winds of Meghalaya",
    "Stories of Meghalaya",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 5000); // Change slides every 5 seconds

    // Return a cleanup function to clear the interval
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Add empty dependency array to run effect only once

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
      className="relative w-full mx-auto"
      style={{ maxWidth: "97%", marginBottom: "3%", marginLeft: "1.5%" }}
      data-carousel="static"
    >
      <br />
      <div className="relative h-[20rem] overflow-hidden">
        <div
          className="absolute flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full flex-none">
              <img
                src={image}
                className="w-full object-cover"
                alt={`Carousel ${index + 1}`}
              />
              <div className="absolute top-[37%] w-full p-10 bg-black bg-opacity-0 hover:bg-opacity-50 transition duration-300 ease-in-out">
                <p className="text-white text-lg">{texts[index]}</p>
              </div>
            </div>
          ))}
        </div>
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
