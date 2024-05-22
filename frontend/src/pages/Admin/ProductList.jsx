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
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [detail, setDetail] = useState({});

  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();
  useEffect(() => {
    if (categories && categories.length > 0) {
      setCategory(categories[0]._id); // Set default category to the first one
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("detail", JSON.stringify(detail)); // Stringify detail
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      console.log("Submitting product with category ID: ", category); // Add this line

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error(" try block error Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/admin/allproductslist");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="text-2xl font-semibold mb-4">
            {t("Create Product")}
          </div>

          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}

          <div className="mb-3">
            <label className="border text-black px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              {t(`${image ? image.name : "Upload Image"}`)}

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? "hidden" : "text-black"}
              />
            </label>
          </div>

          <div className="p-3">
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name">{t("Name")}</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg  text-black shadow-md hover:shadow-lg transition-all ease-in-out duration-75 capitalize"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="two ml-10 ">
                <label htmlFor="name block">{t("Price")}</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg shadow-md hover:shadow-lg transition-all ease-in-out duration-75 text-black"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name block">{t("Quantity")}</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg shadow-md hover:shadow-lg transition-all ease-in-out duration-75 text-black"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="two ml-10 ">
                <label htmlFor="name block">{t("Brand")}</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg shadow-md hover:shadow-lg transition-all ease-in-out duration-75 text-black"
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
              className="p-2 mb-3 shadow-md hover:shadow-lg transition-all ease-in-out duration-75 border rounded-lg w-[97%] text-black h-[8rem]"
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
                  className="p-4 mb-3 w-[30rem] border rounded-lg shadow-md hover:shadow-lg transition-all ease-in-out duration-75 text-black mr-10"
                  value={key}
                  onChange={(e) => handleDetailChange(key, e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Value"
                  className="p-4 mb-3 w-[30rem] border rounded-lg shadow-md hover:shadow-lg transition-all ease-in-out duration-75 text-black"
                  value={value}
                  onChange={(e) => handleDetailValueChange(key, e.target.value)}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddDetailField}
              className="py-2 px-4 mt-2 mb-4 rounded-lg text-sm font-semibold bg-cyan-500 text-white"
            >
              {t("Add Field")}
            </button>

            <div className="flex justify-between">
              <div>
                <label htmlFor="name block">{t("Count In Stock")}</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg shadow-md hover:shadow-lg transition-all ease-in-out duration-75 text-black"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="">{t("Category")}</label> <br />
                <select
                  placeholder="Choose Category"
                  className="p-4 mb-3 w-[30rem] border rounded-lg shadow-md hover:shadow-lg transition-all ease-in-out duration-75 text-gray-500"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-blue-500 text-white hover:bg-blue-600"
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
