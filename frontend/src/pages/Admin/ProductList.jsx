import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";
import { useTranslation } from "react-i18next";
const ProductList = () => {
  const { t } = useTranslation();
  const [images, setImages] = useState([]);  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [detail, setDetail] = useState({});
  const [actualPrice, setActualPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrls, setImageUrls] = useState([]);  
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    if (categories && categories.length > 0) {
      setCategory(categories[0]._id); 
      const firstCategorySubcategories = categories[0].subcategories || [];
      setSubcategories(firstCategorySubcategories);
      if (firstCategorySubcategories.length > 0) {
        setSubcategory(firstCategorySubcategories[0]._id); // Set default subcategory to the first one of the first category
      }
    }
  }, [categories]);

  const handleAddDetailField = () => {
    setDetail({ ...detail, "": "" });
  };

  const handleDetailChange = (key, value) => {
    const updatedDetail = { ...detail };
    delete updatedDetail[key];
    updatedDetail[value] = detail[key];
    setDetail(updatedDetail);
  };

  const handleDetailValueChange = (key, value) => {
    setDetail({ ...detail, [key]: value });
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = categories.find((c) => c._id === e.target.value);
    setCategory(e.target.value);
    setSubcategories(selectedCategory?.subcategories || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      images.forEach(image => {
        productData.append("images", image); 
      });
      productData.append("name", name);
      productData.append("description", description);
      productData.append("detail", JSON.stringify(detail)); 
      productData.append("actualPrice", actualPrice);
      productData.append("discountPercentage", discountPercentage);
      productData.append("category", category);
      productData.append("subcategory", subcategory);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);
      productData.append("images", JSON.stringify(imageUrls));
      console.log("Submitting product with category ID: ", category);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product create failed. Try Again1.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/admin/allproductslist");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again2.");
    }
  };

  const uploadFileHandler = async (e) => {
    const files = Array.from(e.target.files);
    const formData = new FormData();
    files.forEach(file => {
      formData.append("images", file);
    });

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImages(files);  
      setImageUrls(res.images); 
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0] mt-[5rem]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="text-2xl font-semibold mb-4">
            {t("Create Product")}
          </div>

          {imageUrls.length > 0 && (
            <div className="text-center">
              {imageUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`product-${index}`}
                  className="block mx-auto max-h-[200px] my-2"
                />
              ))}
            </div>
          )}

          <div className="mb-3">
            <label className="border text-dark-black px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              {t("Upload Images")}

              <input
                type="file"
                multiple
                name="images"
                accept="image/*"
                onChange={uploadFileHandler}
                className="hidden"
              />
            </label>
          </div>

          <div className="p-3">
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name">{t("Name")}</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg  text-dark-black shadow-md hover:shadow-lg transition-all ease-in-out duration-75 capitalize"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="two ml-10 ">
                <label htmlFor="name block">{t("Actual Price")}</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg shadow-md hover:shadow-lg transition-all ease-in-out duration-75 text-dark-black"
                  value={actualPrice}
                  onChange={(e) => setActualPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="two mr-10 ">
                <label htmlFor="name block">{t("Discount Percentage")}</label>{" "}
                <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg shadow-md hover:shadow-lg transition-all ease-in-out duration-75 text-dark-black"
                  value={discountPercentage}
                  onChange={(e) => setDiscountPercentage(e.target.value)}
                />
              </div>
              <div className="one">
                <label htmlFor="name block">{t("Quantity")}</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg shadow-md hover:shadow-lg transition-all ease-in-out duration-75 text-dark-black"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="two  ">
                <label htmlFor="name block">{t("Brand")}</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg shadow-md hover:shadow-lg transition-all ease-in-out duration-75 text-dark-black"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>

            <label htmlFor="" className="my-5">
              {t("Description")}
            </label>
            <textarea
              type="text"
              className="p-2 mb-3 shadow-md hover:shadow-lg transition-all ease-in-out duration-75 border rounded-lg w-[97%] text-dark-black h-[8rem]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label htmlFor="" className="my-5">
              {t("Product Details")}
            </label>
            <br />
            {Object.entries(detail).map(([key, value], index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  placeholder="Key"
                  className="p-4 mb-3 w-[30rem] border rounded-lg shadow-md hover:shadow-lg transition-all ease-in-out duration-75 text-dark-black mr-10"
                  value={key}
                  onChange={(e) => handleDetailChange(key, e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Value"
                  className="p-4 mb-3 w-[30rem] border rounded-lg shadow-md hover:shadow-lg transition-all ease-in-out duration-75 text-dark-black"
                  value={value}
                  onChange={(e) => handleDetailValueChange(key, e.target.value)}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddDetailField}
              className="py-2 px-4 mt-2 mb-4 rounded-lg text-sm font-semibold bg-dark-button-normal text-light-white hover:bg-dark-button-hover"
            >
              {t("Add Field")}
            </button>

            <div className="flex justify-between">
              <div className="one mr-10">
                <label htmlFor="name block">{t("Count In Stock")}</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg shadow-md hover:shadow-lg transition-all ease-in-out duration-75 text-dark-black"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap">
                <div className="mr-10">
                  <label htmlFor="">{t("Category")}</label> <br />
                  <select
                    placeholder="Choose Category"
                    className="p-4 mb-3 w-[30rem] border rounded-lg shadow-md hover:shadow-lg transition-all ease-in-out duration-75 text-gray-500"
                    value={category}
                    onChange={handleCategoryChange}
                  >
                    {categories?.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="">{t("Subcategory")}</label> <br />
                  <select
                    placeholder="Choose Subcategory"
                    className="p-4 mb-3 w-[30rem] border rounded-lg shadow-md hover:shadow-lg transition-all ease-in-out duration-75 text-gray-500"
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                  >
                    {subcategories.map((sub) => (
                      <option key={sub._id} value={sub._id}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-between"></div>

            <button
              onClick={handleSubmit}
              className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-dark-button-normal text-light-white hover:bg-dark-button-hover"
            >
              {t("Submit")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
