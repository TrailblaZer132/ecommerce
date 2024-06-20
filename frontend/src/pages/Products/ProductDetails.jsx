import { useState } from "react";
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
// import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";
import AddToFavoritesButton from "./AddToFavoritesButton";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [mainImage, setMainImage] = useState("");

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
    navigate("/cart");
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

  console.log(product);
  return (
    <>
      <div>
        <Link
          to="/"
          className="text-black font-semibold hover:underline ml-[10rem]"
        >
          Go Back
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          <div className="flex flex-wrap relative ml-[10rem] mt-[5rem] pb-80 overflow-hidden">
            <div className="fixed left-[2.5rem] w-3/6 overflow-y-hidden overflow-x-hidden">
              <div className="flex">
                <div className="thumbnail-container mr-[5rem]">
                  {product.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Thumbnail ${index}`}
                      className="thumbnail mb-4 w-20 h-20 object-cover cursor-pointer"
                      onClick={() => setMainImage(img)}
                    />
                  ))}
                </div>
                <div className="main-image-container">
                  <img
                    src={mainImage}
                    alt={product.name}
                    className="w-full xl:w-[30rem] lg:w-[25rem] md:w-[20rem] h-full xl:h-[30rem] lg:h-[25rem] md:h-[20rem] object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-wrap btn-container mt-5">
                <AddToFavoritesButton product={product} />
                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className="bg-dark-red-normal text-white py-4 px-10 rounded-lg mt-4 md:mt-0 mr-20 font-semibold"
                >
                  Add To Cart
                </button>
              </div>
            </div>

            <div
              className="ml-[40%] w-[50%] overflow-y-hidden overflow-x-hidden touch-auto
             h-screen p-4"
            >
              <div className="flex flex-col justify-between">
                <div className="flex items-center">
                  <h2 className="text-4xl font-semibold mr-2">
                    {product.name}
                  </h2>
                  {/* <HeartIcon
                    product={product}
                    style={{
                      top: "10px",
                      right: "5rem",
                      position: "absolute",
                      cursor: "pointer",
                    }}
                  /> */}
                </div>
                <p className="my-4 text-[#9b9b9b]">{product.description}</p>

                <div className="flex justify-between flex-wrap">
                  <Ratings
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </div>

                <p className="text-3xl my-4 font-semibold">
                  ₹ {calculatedPrice.toFixed(2)}
                  {discountPercent > 5 && product && (
                    <del className="text-red-500 ml-2 font-normal text-lg">
                      ₹ {product.actualPrice}
                    </del>
                  )}
                </p>

                <div className="mb-6">
                  <h1 className="flex items-center mb-2">
                    <FaInfoCircle className="mr-2 text-gray-700" /> Product
                    Details:{" "}
                  </h1>

                  {product && product.detail && (
                    <table className="table-auto">
                      <tbody>
                        {Object.entries(product.detail).map(([key, value]) => (
                          <tr key={key}>
                            <td className="border px-4 py-2">{key}</td>
                            <td className="border px-4 py-2">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>

                <div className="flex items-center justify-between w-[25rem]">
                  <div className="one">
                    <h1 className="flex items-center mb-6">
                      <FaStore className="mr-2 text-gray-700" /> Brand:{" "}
                      {product.brand}
                    </h1>
                    {/* <h1 className="flex items-center mb-6 w-[20rem]">
                      <FaClock className="mr-2 text-gray-700" /> Added:{" "}
                      {moment(product.createAt).fromNow()}
                    </h1> */}
                    <h1 className="flex items-center mb-6">
                      <FaStar className="mr-2 text-gray-700" /> Reviews:{" "}
                      {product.numReviews}
                    </h1>
                  </div>

                  <div className="two">
                    {/* <h1 className="flex items-center mb-6">
                      <FaStar className="mr-2 text-gray-700" /> Ratings:{" "}
                      {rating}
                    </h1> */}
                    <h1 className="flex items-center mb-6">
                      <FaShoppingCart className="mr-2 text-gray-700" />{" "}
                      Quantity: {product.quantity}
                    </h1>
                    <h1 className="flex items-center mb-6 w-[10rem]">
                      <FaBox className="mr-2 text-gray-700" /> In Stock:{" "}
                      {product.countInStock}
                    </h1>
                  </div>
                </div>

                {product.countInStock > 0 && (
                  <div>
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="p-2 w-[6rem] rounded-lg text-black"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="mt-5">
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
        </>
      )}
    </>
  );
};

export default ProductDetails;
