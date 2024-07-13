import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard.jsx";

const Shop = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });
  const resetFilters = () => {
    // Reset local states
    setPriceFilter("");

    // Reset Redux states
    dispatch(setChecked([]));
    dispatch(setProducts([]));
  };
  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
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
    }
  }, [location.search, categories, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        // Filter products based on both checked categories and price filter
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            // Calculate the discounted price
            const discountedPrice =
              product.actualPrice * (1 - product.discountPercentage / 100);

            // Check if the discounted price includes the entered price filter value
            return (
              discountedPrice.toString().includes(priceFilter) ||
              discountedPrice === parseInt(priceFilter, 10)
            );
          }
        );

        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
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

  const handlePriceChange = (e) => {
    // Update the price filter state when the user types in the input field
    setPriceFilter(e.target.value);
  };

  return (
    <>
      <div className="container mx-20 mt-[5rem]">
        <div className="flex md:flex-row">
          <div
            className="p-3 mt-2 mb-2 rounded-xl"
            style={{
              borderRadius: "20px",
              background: "#ffe0e0",
              boxShadow: "8px 8px 18px #cccccc, -8px -8px 18px #ffffff",
            }}
          >
            <h2 className="h4 text-center py-2 font-semibold rounded-full mb-2">
              Filter by Categories
            </h2>

            <div
              className="p-5 w-[15rem]"
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
                      className="ml-2 text-sm font-medium text-white dark:text-gray-800"
                    >
                      {c.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="h4 text-center py-2 font-semibold rounded-full mb-2">
              Filter by Brands
            </h2>

            <div
              className="p-5"
              style={{ maxHeight: "300px", overflowY: "auto" }}
            >
              {uniqueBrands?.map((brand) => (
                <div key={brand} className="flex items-center mr-4 mb-5">
                  <input
                    type="radio"
                    id={`${brand}-radio`}
                    name="brand"
                    onChange={() => handleBrandClick(brand)}
                    className="w-4 h-4 text-dark-yellow bg-gray-100 border-gray-300 accent-dark-red-normal"
                  />

                  <label
                    htmlFor={`${brand}-radio`}
                    className="ml-2 text-sm font-medium text-white dark:text-gray-800"
                  >
                    {brand}
                  </label>
                </div>
              ))}
            </div>

            <h2 className="h4 text-center py-2 font-semibold rounded-full mb-2">
              Filter by Price
            </h2>

            <div className="p-5 w-[15rem]">
              <input
                type="text"
                placeholder="Enter Price"
                value={priceFilter}
                onChange={handlePriceChange}
                className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-pink-300"
              />
            </div>

            <div className="p-5 pt-0">
              <button
                className="w-full border border-dark-red-hover text-dark-red-normal rounded-lg my-4 hover:bg-dark-red-hover hover:text-white"
                onClick={resetFilters}
              >
                Reset
              </button>
            </div>
          </div>

          <div className="p-3">
            <h2 className="h4 text-center mb-2">{products?.length} Products</h2>
            <div className="flex flex-wrap">
              {products.length === 0 ? (
                <Loader />
              ) : (
                products?.map((p) => (
                  <div className="p-5 w-1/4" key={p._id}>
                    <ProductCard p={p} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
