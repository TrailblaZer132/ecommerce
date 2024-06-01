import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";
import Slider from "./Slider";
import Categories from "../components/CategoryForHome";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {/* <div className="mt-[6rem] flex justify-center items-center"> */}
      <div className="mt-[6rem] flex ml-10">
        <div
          className="p-4 text-white font-bold mr-4"
          style={{
            borderRadius: "10px",
            background: "#4785ff",
            boxShadow: "2px 2px 8px #b6b7b9, -2px -2px 8px #ffffff",
          }}
        >
          Categories
        </div>
        <Categories />
      </div>
      <Slider />
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="ml-[20rem] mt-[10rem] text-[3rem]">
              Special Products
            </h1>

            <Link
              to="/shop"
              className="bg-blue-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem] text-white hover:bg-blue-800 transition duration-75 ease-in-out"
            >
              Shop
            </Link>
          </div>

          <div>
            <div className="flex justify-center flex-wrap mt-[2rem]">
              {data.products.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
