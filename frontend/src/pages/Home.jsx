// import { Link, useParams } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
// import Header from "../components/Header";
// import Product from "./Products/Product";
import Slider from "./Slider";
import Categories from "../components/CategoryForHome";
import Slide from "./Slide";
import { useTranslation } from "react-i18next";


const Home = () => {
  const { t } = useTranslation();
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  // Optional: Log data to inspect its structure
  console.log("Fetched data:", data);

  return (
    <>
      <div className="mt-[5.5rem]  flex justify-center items-center">
        <Categories />
      </div>
      <Slider />
      {!keyword ? <></> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        data &&
        data.products && (
          <>
            <div>
              <Slide products={data.products} title={t("Top Selection")} />
            </div>
            <div>
              <Slide products={data.products} title={t("Recomended for You")} />
            </div>
            <div>
              <Slide products={data.products} title={t("Special Products")} />
            </div>
            {/* <div className="flex justify-between items-center">
              <h1 className="ml-[20rem] mt-[10rem] text-[3rem]">
                Special Products
              </h1>

              <Link
                to="/shop"
                className="bg-dark-green-normal font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem] text-white hover:bg-dark-green-hover transition duration-75 ease-in-out"
              >
                Shop
              </Link>
            </div> */}

            {/* <div>
              <div className="flex justify-center flex-wrap mt-[2rem]">
                {data.products.map((product) => (
                  <div key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
            </div> */}
          </>
        )
      )}
    </>
  );
};

export default Home;
