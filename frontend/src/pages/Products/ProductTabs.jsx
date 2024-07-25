import { useState } from "react";
import { Link } from "react-router-dom";
import StarRating from "../../components/StarRating";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();
  const [activeTab, setActiveTab] = useState(1);
  const [error, setError] = useState('');

  if (isLoading) {
    return <Loader />;
  }

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating && !comment) {
      setError('Please provide either a rating or a comment');
      return;
    }
    setError('');
    submitHandler(e);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <section className="mr-[5rem]">
        <div
          className={`flex-1 p-4 cursor-pointer text-lg ${
            activeTab === 1 ? "font-bold" : ""
          }`}
          onClick={() => handleTabClick(1)}
        >
        </div>
      </section>

      <section>
        {activeTab === 1 && (
          <div className="mt-7">
            {userInfo ? (
              <form onSubmit={handleSubmit}>
                {error && <div className="text-red-500">{error}</div>}
                <div className="my-2">
                  <label htmlFor="rating" className="block text-xl mb-2 font-semibold">
                    Your Rating
                  </label>
                  <StarRating rating={rating} setRating={setRating} />
                </div>

                <div className="my-2">
                  <label htmlFor="comment" className="block text-xl mb-2 font-semibold" >
                    Your Comment
                  </label>
                  <textarea
                    id="comment"
                    rows="3"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="p-2 border rounded-lg xl:w-[30rem] text-black"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className="bg-dark-red-normal text-white py-2 px-4 rounded-lg hover:bg-dark-red-hover"
                >
                  Submit
                </button>
              </form>
            ) : (
              <p>
                Please <Link to="/login">sign in</Link> to write a review
              </p>
            )}
            <div className="mt-8 w-full overflow-x-scroll">
              <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
              {product.reviews && product.reviews.length > 0 ? (
                <div>
                  {product.reviews
                    .filter((review) => review.comment) // Filter out reviews without comments
                    .map((review) => (
                      <div
                        key={review._id}
                        className="bg-light-lightRed p-4 rounded-lg mb-5"
                      >
                        <div className="flex justify-between">
                          <p className="font-semibold">{review.name}</p>
                          <p className="text-[#5a5a5a]">
                            {review.createdAt.substring(0, 10)}
                          </p>
                        </div>
                        <p className="my-4">{review.comment}</p>
                        <StarRating rating={review.rating} setRating={() => {}} />{" "}
                        {/* Read-only */}
                      </div>
                    ))}
                </div>
              ) : (
                <p>No Reviews</p>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductTabs;
