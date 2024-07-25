import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useTranslation } from "react-i18next";

import {
  setCategories,
  setProducts,
  setChecked,
  setCheckedBrands,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard.jsx";

const Shop = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const { categories, products, checked, checkedBrands, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    checkedBrands,
    radio,
  });

  const [priceRange, setPriceRange] = useState([0, 1000]); // Initial range
  const [filtersApplied, setFiltersApplied] = useState(false); // Track if filters are applied
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const resetFilters = () => {
    // Reset local states
    setPriceRange([minPrice, maxPrice]);

    // Reset Redux states
    dispatch(setChecked([]));
    dispatch(setCheckedBrands([]));
    dispatch(setProducts(filteredProductsQuery.data || []));

    // Reset filters applied flag
    setFiltersApplied(false);
  };

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data || []));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryFilter = searchParams.get("category");

    if (categoryFilter && categories) {
      const filteredCategory = categories.find(
        (category) => category.name === categoryFilter
      );

      // Apply the category filter to checked
      const updatedChecked = [filteredCategory?._id];
      dispatch(setChecked(updatedChecked));

      // Set filters applied flag to true
      setFiltersApplied(true);
    }
  }, [location.search, categories, dispatch]);

  useEffect(() => {
    if (!filteredProductsQuery.isLoading && filteredProductsQuery.data) {
      const prices = filteredProductsQuery.data.map((product) => {
        return product.actualPrice * (1 - product.discountPercentage / 100);
      });

      if (prices.length > 0) {
        setMinPrice(Math.min(...prices));
        setMaxPrice(Math.max(...prices));
        setPriceRange([Math.min(...prices), Math.max(...prices)]);
      }
    }
  }, [filteredProductsQuery.data]);

  useEffect(() => {
    if (!filteredProductsQuery.isLoading && filteredProductsQuery.data) {
      const applyFilters = () => {
        let filteredProducts = filteredProductsQuery.data;

        // Apply category filters if any
        if (checked.length > 0) {
          filteredProducts = filteredProducts.filter((product) =>
            checked.includes(product.category)
          );
        }

        // Apply brand filters if any
        if (checkedBrands.length > 0) {
          filteredProducts = filteredProducts.filter((product) =>
            checkedBrands.includes(product.brand)
          );
        }

        // Apply price filter
        filteredProducts = filteredProducts.filter((product) => {
          const discountedPrice =
            product.actualPrice * (1 - product.discountPercentage / 100);
          return (
            discountedPrice >= priceRange[0] && discountedPrice <= priceRange[1]
          );
        });

        dispatch(setProducts(filteredProducts));
      };

      applyFilters();
    }
  }, [checked, checkedBrands, priceRange, filteredProductsQuery.data, dispatch]);

  const handleBrandCheck = (value, brand) => {
    const updatedCheckedBrands = value
      ? [...checkedBrands, brand]
      : checkedBrands.filter((b) => b !== brand);
    dispatch(setCheckedBrands(updatedCheckedBrands));

    // Set filters applied flag to true
    setFiltersApplied(true);
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));

    // Set filters applied flag to true
    setFiltersApplied(true);
  };

  // Add "All Brands" option to uniqueBrands
  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (value) => {
    setPriceRange(value);

    // Set filters applied flag to true
    setFiltersApplied(true);
  };

  return (
    <>
      <div className="container mt-[5rem] sm:mx-20 md:mx-[4rem] lg:mx-[2rem] xl:mx-[2rem] 2xl:mx-[4.3rem] 3xl:mx-[5rem] 4xl:mx-[5rem]">
        <div className="flex">
          <div
            className="p-3 mt-2 mb-2 rounded-xl h-full"
            style={{
              borderRadius: "20px",
              background: "#ffe0e0",
              boxShadow: "8px 8px 18px #cccccc, -8px -8px 18px #ffffff",
            }}
          >
            <h2 className="h4 text-center py-2 font-semibold mb-2">
              {t("Filter by Categories")}
            </h2>

            <div
              className="p-5"
              style={{ maxHeight: "300px", overflowY: "auto" }}
            >
              {categories?.map((c) => (
                <div key={c._id} className="mb-2">
                  <div className="flex items-center mr-4">
                    <input
                      type="checkbox"
                      id={`${c._id}-checkbox`}
                      checked={checked.includes(c._id)}
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className="w-4 h-4 text-dark-yellow bg-gray-100 border-gray-300 rounded accent-dark-red-normal"
                    />

                    <label
                      htmlFor={`${c._id}-checkbox`}
                      className="ml-2 text-sm font-medium text-black "
                    >
                      {c.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="h4 text-center py-2 font-semibold mb-2">
              {t("Filter by Brands")}
            </h2>

            <div
              className="p-5"
              style={{ maxHeight: "300px", overflowY: "auto" }}
            >
              {uniqueBrands?.map((brand) => (
                <div key={brand} className="mb-2">
                  <div className="flex items-center mr-4">
                    <input
                      type="checkbox"
                      id={`${brand}-checkbox`}
                      checked={checkedBrands.includes(brand)}
                      onChange={(e) =>
                        handleBrandCheck(e.target.checked, brand)
                      }
                      className="w-4 h-4 text-dark-yellow bg-gray-100 border-gray-300 accent-dark-red-normal"
                    />

                    <label
                      htmlFor={`${brand}-checkbox`}
                      className="ml-2 text-sm font-medium text-black "
                    >
                      {brand}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="h4 text-center py-2 font-semibold mb-2">
              {t("Filter by Price")}
            </h2>

            <div className="p-5">
              <Slider
                range
                min={minPrice}
                max={maxPrice}
                value={priceRange}
                onChange={handlePriceChange}
                trackStyle={{ backgroundColor: "#FF0000" }} // Customize slider track style
                handleStyle={{ borderColor: "#FF0000" }} // Customize slider handle style
              />
              <div className="flex justify-between mt-2">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                className="w-full border border-dark-red-hover text-dark-red-normal rounded-lg my-4 hover:bg-dark-red-hover hover:text-white"
                onClick={resetFilters}
              >
                {t("Reset")}
              </button>
            </div>
          </div>

          <div className="p-6 w-4/5">
            <h2 className="h4 text-center mb-4">{products?.length} {t("Products")}</h2>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 4xl:grid-cols-7 gap-20">
              {products.length === 0 ? (
                <Loader />
              ) : (
                products?.map((p) => <ProductCard key={p._id} p={p} />)
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
