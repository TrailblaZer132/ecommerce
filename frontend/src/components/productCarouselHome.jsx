import { useState, useEffect } from "react";
import SmallProduct from "../pages/Products/SmallProduct";

const ProductCarouselHome = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex < products.length - 4 ? prevIndex + 4 : 0
      );
    }, 3000); // Change slides every 3 seconds

    return () => clearInterval(intervalId);
  }, [products.length]);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 25}%)` }}
      >
        {products.map((product) => (
          <div key={product._id} className="w-1/4 p-2">
            <SmallProduct product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarouselHome;
