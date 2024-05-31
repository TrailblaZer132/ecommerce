import { useNavigate } from "react-router-dom";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import { useTranslation } from "react-i18next";

const Category = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: categories } = useFetchCategoriesQuery();

  const handleCategoryClick = (category) => {
    // Pass the category name to the handleCategoryClick function
    navigate(`/shop?category=${category.name}`);
  };

  return (
    <>
      <br/><br/><br/><br/>
      <div className="flex flex-wrap">
        {categories?.map((category) => (
          <div key={category._id}>
            <button
              className="bg-white border border-blue-500 text-blue-500 py-2 px-4 rounded-lg m-3 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={() => handleCategoryClick(category)}
            >
              {t(`${category.name}`)}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Category;