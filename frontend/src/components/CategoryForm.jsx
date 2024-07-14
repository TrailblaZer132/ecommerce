import { useTranslation } from "react-i18next";
import { useState } from "react";

const CategoryForm = ({
  value,
  setValue,
  subcategories = [],
  setSubcategories,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) => {
  const { t } = useTranslation();
  const [subcategoryInput, setSubcategoryInput] = useState("");

  const addSubcategory = () => {
    if (subcategoryInput.trim()) {
      setSubcategories([...subcategories, { name: subcategoryInput }]);
      setSubcategoryInput("");
    }
  };

  const removeSubcategory = (index) => {
    setSubcategories(subcategories.filter((_, i) => i !== index));
  };

  return (
    <div className="p-3">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          className="py-3 px-4 border rounded-lg w-full capitalize focus:outline-none focus:ring-2 focus:ring-dark-red-normal focus:ring-opacity-50"
          placeholder={t("Write category name")}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        
        <div className="space-y-2">
          <input
            type="text"
            className="py-3 px-4 border rounded-lg w-full capitalize focus:outline-none focus:ring-2 focus:ring-dark-red-normal focus:ring-opacity-50"
            placeholder={t("Write subcategory name")}
            value={subcategoryInput}
            onChange={(e) => setSubcategoryInput(e.target.value)}
          />
          <button
            type="button"
            onClick={addSubcategory}
            className="bg-dark-red-normal text-white py-1 px-2 rounded-lg hover:bg-dark-red-hover focus:outline-none focus:ring-2 focus:ring-dark-red-hover focus:ring-opacity-50"
          >
            {t("Add Subcategory")}
          </button>
          <div className="space-y-1">
            {subcategories.map((subcategory, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 px-4 border rounded-lg"
              >
                {subcategory.name}
                <button
                  type="button"
                  onClick={() => removeSubcategory(index)}
                  className="bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                  {t("Remove")}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button className="bg-dark-red-normal text-white py-2 px-4 rounded-lg hover:bg-dark-red-hover focus:outline-none focus:ring-2 foucs:ring-pink-500 focus:ring-opacity-50">
            {t(`${buttonText}`)}
          </button>

          {handleDelete && (
            <button
              onClick={handleDelete}
              className="bg-dark-red-normal text-white py-2 px-4 rounded-lg hover:bg-dark-red-hover focus:outline-none focus:ring-2 foucs:ring-red-500 focus:ring-opacity-50"
            >
              {t("Delete")}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
