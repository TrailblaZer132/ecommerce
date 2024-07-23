import { Link, useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useTranslation } from "react-i18next";

const Slide = ({ products = [], title }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const randomizedProducts = [...products].sort(() => Math.random() - 0.5);

  return (
    <div className="mt-2.5 bg-white">
      <div className="flex p-5">
        <h2 className="text-lg font-semibold mr-6 text-red-600">{title}</h2>
        <button
          className="ml-auto bg-red-600 text-white rounded-lg px-4 py-2 hover:bg-red-700 transition-colors"
          onClick={() => {
            navigate("/shop");
          }}
        >
          View All
        </button>
      </div>
      <hr />
      {Array.isArray(products) && products.length > 0 ? (
        <div className="mx-10">
          <Carousel
            swipeable={false}
            draggable={false}
            responsive={responsive}
            centerMode={true}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={10000}
            keyBoardControl={true}
            showDots={false}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {randomizedProducts.map((product, index) => {
              const firstImage =
                product.images && product.images.length > 0
                  ? product.images[0]
                  : "/placeholder.jpg";

              return (
                <Link
                  key={index}
                  to={`/product/${product._id}`}
                  className="no-underline"
                >
                  <div className="text-center p-6 flex flex-col justify-center items-center">
                    <img
                      src={firstImage}
                      loading="lazy"
                      alt={product.name}
                      className="w-48 h-48 sm:w-60 sm:h-60 object-cover"
                    />
                    <h3 className="mt-2 text-black font-bold text-xs sm:text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">
                      {product.name}
                    </h3>
                    <div className="flex gap-2 justify-center items-center mt-2 flex-wrap">
                      <p className="text-black font-semibold text-xs sm:text-base">
                        ₹
                        {(
                          product.actualPrice *
                          (1 - product.discountPercentage / 100)
                        ).toFixed(2)}
                      </p>
                      <p className="text-gray-500 text-xxs sm:text-xs line-through">
                        ₹{product.actualPrice}
                      </p>
                      <p className="text-xxs sm:text-xs text-red-500">
                        {product.discountPercentage}% off
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </Carousel>
        </div>
      ) : (
        <p className="text-center text-lg">No products available</p>
      )}
    </div>
  );
};

export default Slide;

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
