import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
  FaInfoCircle,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { useTranslation } from "react-i18next";
import Navigation from "../Auth/Navigation";

const ProductDetails = () => {
  const { t } = useTranslation();
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [isFixed, setIsFixed] = useState(true);
  const [style, setStyle] = useState(transitionStyles);

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    // navigate("/cart");
  };

  const buyNowHandler = () => {
    // dispatch(addToCart({ ...product, qty }));
    // navigate("/purchase");
    navigate("/purchase", { state: { product } });
  };

  let calculatedPrice = 0;
  let discountPercent = 0;

  if (product) {
    calculatedPrice =
      product.actualPrice * (1 - product.discountPercentage / 100);
    discountPercent = product.discountPercentage;
    if (!mainImage) {
      setMainImage(product.images[0]);
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const reviewDiv = document.getElementById("reviewDiv");
      const triggerPoint = reviewDiv.offsetTop - 1000;

      if (window.scrollY >= triggerPoint) {
        setStyle({ ...transitionStyles, opacity: 0, visibility: "hidden" });
      } else {
        setStyle({ ...transitionStyles, opacity: 1, visibility: "visible" });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-light-red min-h-screen py-8">
      {" "}
      <br />
      <div className="max-w-full mx-auto sm:px-6 lg:px-24 xl:px-32 2xl:px-32 3xl:px-32 4xl:px-40">
        {/* <Link to="/" className="text-black font-semibold hover:underline mb-4">
          {t("Go Back")}
        </Link> */}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.message}
          </Message>
        ) : (
          <div className="flex flex-col md:flex-row mx-4">
            <div className="md:flex-1 px-4 ">
              <div className="xl:h-[35rem] xl:w-[35rem] rounded-lg bg-light-white overflow-hidden shadow-md mb-4 ">
                <img
                  className="w-full h-full object-cover"
                  src={mainImage}
                  alt="Product Image"
                />
              </div>
              <div className="flex mb-4">
                {product.images.map((img, index) => (
                  <div key={index} className="w-1/4 px-2">
                    <img
                      src={img}
                      alt={`Thumbnail ${index}`}
                      className="thumbnail mb-4 w-24 h-20 object-cover cursor-pointer"
                      onClick={() => setMainImage(img)}
                    />
                  </div>
                ))}
              </div>
              <div className="flex mb-4">
                <div className="w-[10%] px-3"></div>
                <div className="w-[30%] px-3">
                  <button
                    onClick={buyNowHandler}
                    disabled={product.countInStock === 0}
                    className="w-full h-full bg-dark-red-normal text-white py-3 px-4 rounded-full font-bold hover:bg-dark-red-hover"
                  >
                    {t("Buy Now")}
                  </button>
                </div>
                <div className="w-[30%] px-3">
                  <button
                    onClick={addToCartHandler}
                    disabled={product.countInStock === 0}
                    className="w-full h-full bg-dark-red-normal text-light-white py-3 px-4 rounded-full font-bold hover:bg-dark-red-hover"
                  >
                    {t("Add to Cart")}
                  </button>
                </div>
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="text-4xl font-semibold mr-2">{product.name}</h2>

              <p className="my-4 text-[#9b9b9b] whitespace-pre-line">
                {product.description}
              </p>
              <hr />
              <div className="flex mb-4">
                <div className="mr-4">
                  <p className="text-3xl my-4 font-semibold">
                    ₹ {calculatedPrice.toFixed(2)}
                    {discountPercent > 5 && product && (
                      <del className="text-red-500 ml-2 font-normal text-lg">
                        ₹ {product.actualPrice}
                      </del>
                    )}
                    <span
                      style={{
                        fontSize: "0.9rem",
                        color: "green",
                        alignItems: "center",
                        marginLeft: "0.5rem",
                      }}
                    >
                      {discountPercent}% off
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between w-[25rem]">
                <div className="one">
                  <h1 className="flex items-center mb-6 font-medium">
                    <FaStore className="mr-2 text-gray-700" /> Brand:{" "}
                    {product.brand}
                  </h1>
                </div>

                <div className="two">
                  <h1 className="flex items-center mb-6 w-[10rem] font-medium">
                    <FaBox className="mr-2 text-gray-700" /> In Stock:{" "}
                    {product.countInStock}
                  </h1>
                </div>
              </div>

              <div className="mb-4">
                <span className="font-bold text-dark-gray">Ratings</span>
                <div>
                  <Ratings
                    value={product.rating}
                    text={`${product.numReviews} ${
                      product.numReviews > 1 ? "Reviews" : "Review"
                    }`}
                  />
                </div>
              </div>
              <br />
              <hr />
              <br />
              <div className="mb-4">
                <span className="font-bold text-dark-gray">
                  Product Details
                </span>
                {product && product.detail && (
                  <table className="table-auto border-hidden mt-2">
                    <tbody>
                      {Object.entries(product.detail).map(([key, value]) => (
                        <tr key={key}>
                          <td className="border px-4 py-2 border-hidden font-semibold">
                            {key}
                          </td>
                          <td className="border px-4 py-2 border-hidden whitespace-pre-line">
                            {value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <hr />
      <div className="mt-5">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8" id="reviewDiv">
          <ProductTabs
            loadingProductReview={loadingProductReview}
            userInfo={userInfo}
            submitHandler={submitHandler}
            rating={rating}
            setRating={setRating}
            comment={comment}
            setComment={setComment}
            product={product}
          />
        </div>
      </div>
    </div>
  );
};

const transitionStyles = {
  transition: "opacity 0.5s ease-in-out",
  opacity: 1, // Default visible state
};

export default ProductDetails;
