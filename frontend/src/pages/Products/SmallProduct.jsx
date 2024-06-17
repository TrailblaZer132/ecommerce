//products beside the caraousel
import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-[20rem] ml-[2rem] p-3 relative">
      <div className="relative h-[20rem] w-[20rem] overflow-hidden rounded">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center hover:text-dark-yellow font-semibold">
            <div>{product.name}</div>
            <span className="bg-dark-green-normal text-dark-green text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-dark-green-hover dark:text-white">
              ₹{product.actualPrice * (1 - product.discountPercentage / 100)}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default SmallProduct;
