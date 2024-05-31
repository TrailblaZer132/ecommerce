import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import { useTranslation } from "react-i18next";

const Category = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: categories } = useFetchCategoriesQuery();
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryClick = (category) => {
    navigate(`/shop?category=${category.name}`);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="flex flex-wrap">
        {categories?.slice(0, 10).map((category) => (
          <div key={category._id}>
            <button
              className="bg-white text-gray-500 py-2 px-4 rounded-lg m-2 ml-5 hover:bg-blue-500 hover:text-white  ease-in-out duration-100"
              onClick={() => handleCategoryClick(category)}
            >
              {t(`${category.name}`)}
            </button>
          </div>
        ))}
        {categories?.length > 8 && (
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                onClick={toggleDropdown}
                className="bg-white border border-gray-300 text-gray-500 py-2 px-4 rounded-lg m-2 ml-5 hover:bg-blue-500 hover:text-white ease-in-out duration-100 flex flex-wrap"
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
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-gray-900"
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
