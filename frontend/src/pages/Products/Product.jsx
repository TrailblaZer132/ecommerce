//Special
import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-[22rem] ml-[1rem] p-3 relative mt-[5rem]">
      <div className=" relative h-[20rem] w-[20rem] overflow-hidden rounded">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between    items-center hover:text-dark-yellow">
            <div className="text-lg font-semibold">{product.name}</div>
            <span className="  text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full bg-dark-red-hover text-white">
              ₹ {product.actualPrice * (1 - product.discountPercentage / 100)}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
