import { Link } from "react-router-dom";
import moment from "moment";
import { useEffect } from "react";
import { useGetProductsByUserQuery } from "../../redux/api/productApiSlice";
import SellerMenu from "./SellerMenu";
import AdminMenu from "./AdminMenu";
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux';

const AllProducts = () => {
  const { t } = useTranslation();
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo._id; 
  const { data: products, isLoading, isError, refetch } = useGetProductsByUserQuery(userId);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 10000); // Adjust the interval as needed (e.g., 10000 ms = 10 seconds)

    return () => clearInterval(interval);
  }, [refetch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <div className="container mx-[9rem] mt-[5rem]">
      <div className="flex flex-col md:flex-row">
        <div className="p-3">
          <div className="ml-[2rem] text-xl font-bold h-12">
            {t("All Products")} 
          </div>
          <div className="flex flex-wrap justify-around items-center">
            {products && products.length > 0 ? (
              products.map((product) => {
                const calculatedPrice = product.actualPrice * (1 - product.discountPercentage / 100);
                const firstImage = product.images && product.images.length > 0 ? product.images[0] : '/placeholder.jpg';

                return (
                  <Link
                    key={product._id}
                    to={`/seller/product/update/${product._id}`}
                    className="block mb-4 overflow-hidden cursor-default rounded-lg shadow-md hover:shadow-lg transition-all ease-in-out duration-75"
                  >
                    <div className="flex">
                      <img
                        src={firstImage}
                        alt={product.name}
                        className="w-[10rem] h-[10rem] object-cover rounded-lg p-1"
                      />
                      <div className="p-4 flex flex-col justify-between">
                        <div className="flex justify-between">
                          <h5 className="text-xl font-semibold mb-2">
                            {product.name}
                          </h5>
                          <p className="text-gray-500 text-xs">
                            {moment(product.createdAt).format("MMMM Do YYYY")}
                          </p>
                        </div>
                        <p className="text-gray-500 xl:w-[30rem] lg:w-[30rem] md:w-[20rem] sm:w-[10rem] text-sm mb-4">
                          {product.description && product.description.substring(0, 100)}...
                        </p>
                        <div className="flex justify-between items-center">
                          <Link
                            to={`/seller/product/update/${product._id}`}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-dark-red-normal rounded-lg hover:bg-dark-red-hover"
                          >
                            {t("Update Product")}
                            <svg
                              className="w-3.5 h-3.5 ml-2"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 14 10"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                              />
                            </svg>
                          </Link>
                          <p className="text-gray-500">
                            {t("Stock Available")}: {product.countInStock}
                          </p>
                          <p>₹{calculatedPrice.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div>{t("No products found")}</div>
            )}
          </div>
        </div>
        <div className="md:w-1/4 p-3 mt-2">
        {userInfo.isSeller&& (<SellerMenu />)}
        {userInfo.isAdmin&& (<AdminMenu />)}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;





