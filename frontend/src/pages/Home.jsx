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
import Navigation from "./Auth/Navigation";

const Home = () => {
  const { t } = useTranslation();
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  // Optional: Log data to inspect its structure
  console.log("Fetched data:", data);

  return (
    <>
      <div className="flex justify-center items-center mt-[2.5rem]">
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
              <Slide
                products={data.products}
                title={t("Recommended for You")}
              />
            </div>
            <div>
              <Slide products={data.products} title={t("Special Products")} />
            </div>
          </>
        )
      )}
    </>
  );
};

export default Home;
