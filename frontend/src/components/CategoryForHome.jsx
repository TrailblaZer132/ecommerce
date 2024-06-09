import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import { useTranslation } from "react-i18next";

const Category = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: categories } = useFetchCategoriesQuery();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  const handleCategoryClick = (category) => {
    navigate(`/shop?category=${category.name}`);
    setIsOpen(false);
  };

  const handleSubcategoryClick = (category, subcategory) => {
    navigate(`/shop?category=${category.name}&subcategory=${subcategory.name}`);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="flex flex-wrap">
        {categories?.slice(0, 10).map((category) => (
          <div
            key={category._id}
            className="m-2 relative"
            onMouseEnter={() => {
              clearTimeout(timeoutId);
              setHoveredCategory(category._id);
            }}
            onMouseLeave={() => {
              setTimeoutId(
                setTimeout(() => {
                  setHoveredCategory(null);
                }, 1000)
              ); // Change this to the desired delay in milliseconds
            }}
          >
            <button
              className=" text-dark-red-normal py-2 px-4 rounded-lg m-2 ml-5 hover:bg-dark-red-normal hover:text-white  ease-in-out duration-100 font-semibold text-xl"
              onClick={() => handleCategoryClick(category)}
            >
              {t(`${category.name}`)}
            </button>
            {hoveredCategory === category._id && category.subcategories && (
              <div className="absolute top-full mt-2 w-48 bg-white shadow-lg rounded-lg z-10">
                {category.subcategories.map((subcategory) => (
                  <button
                    key={subcategory._id}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-gray-900"
                    onClick={() =>
                      handleSubcategoryClick(category, subcategory)
                    }
                  >
                    {t(`${subcategory.name}`)}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        {categories?.length > 8 && (
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                onClick={toggleDropdown}
                className=" text-gray-500 py-2 px-4 rounded-lg m-2 ml-5 hover:bg-dark-red-normal hover:text-white ease-in-out duration-100 flex flex-wrap text-bold"
                id="options-menu"
                aria-haspopup="true"
                aria-expanded="true"
              >
                More
                <svg
                  className="-mr-1 ml-2 h-5 w-5 flex flex-wrap"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {isOpen && (
              <div
                className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                onMouseLeave={() => setIsOpen(false)}
              >
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {categories?.slice(8).map((category) => (
                    <a
                      key={category._id}
                      onClick={() => handleCategoryClick(category)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-gray-900 font-semibold"
                      role="menuitem"
                    >
                      {t(`${category.name}`)}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Category;
