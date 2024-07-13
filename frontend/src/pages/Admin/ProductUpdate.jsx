import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const AdminProductUpdate = () => {
  const { t } = useTranslation();
  const params = useParams();

  const { data: productData, refetch } = useGetProductByIdQuery(params._id);

  const [images, setImages] = useState(productData?.images || "");
  const [imageUrls, setImageUrls] = useState([]);
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [detail, setDetail] = useState(productData?.detail || {});

  const [actualPrice, setActualPrice] = useState(
    productData?.actualPrice || ""
  );
  const [discountPercentage, setDiscountPercentage] = useState(
    productData?.discountPercentage || 0
  );
  const [price, setPrice] = useState(productData?.price || "");
  const [category, setCategory] = useState(productData?.category?._id || "");
  const [subcategory, setSubcategory] = useState(
    productData?.subcategory?._id || ""
  );
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [stock, setStock] = useState(productData?.countInStock || 0);

  const navigate = useNavigate();
  const { data: categories = [] } = useFetchCategoriesQuery();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setDetail(productData.detail || {});
      setActualPrice(productData.actualPrice);
      setDiscountPercentage(productData.discountPercentage);
      setPrice(productData.price);
      setCategory(productData.category?._id);
      setSubcategory(productData.subcategory?._id);
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImageUrls(productData.images);

      setStock(productData.countInStock);
    }

    const interval = setInterval(() => {
      refetch();
    }, 100);

    return () => clearInterval(interval);
  }, [productData, refetch]);

  useEffect(() => {
    if (category) {
      const selectedCategory = categories.find((c) => c._id === category);
      setSubcategories(selectedCategory?.subcategories || []);
    }
  }, [category, categories]);

  const uploadFileHandler = async (e) => {
    const files = Array.from(e.target.files);
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImages([...images, ...files]);
      setImageUrls([...imageUrls, ...res.images]);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleDetailChange = (key, value) => {
    setDetail((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAddDetailField = () => {
    setDetail((prev) => ({
      ...prev,
      [""]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const calculatedPrice = actualPrice * (1 - discountPercentage / 100);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("detail", JSON.stringify(detail));
      formData.append("actualPrice", actualPrice);
      formData.append("discountPercentage", discountPercentage);
      formData.append("price", calculatedPrice);
      formData.append("category", category);
      formData.append("subcategory", subcategory);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);
      formData.append("newImages", JSON.stringify(imageUrls));
      formData.append("oldImages", JSON.stringify(productData.images));

      const data = await updateProduct({
        productId: params._id,
        formData,
      });

      console.log("Update product response:", data);

      if (data?.error) {
        console.error(data.error);
        toast.error(data.error.message || "Product update failed. Try again.", {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        toast.success("Product successfully updated", {
          position: "top-right",
          autoClose: 2000,
        });
        navigate("/admin/allproductslist");
      }
    } catch (err) {
      console.error(err);
      toast.error("Product update failed. Try again.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const handleDelete = async () => {
    // Check if toast is defined
    if (typeof toast === "undefined") {
      console.error("toast is not defined. Check your imports.");
    }

    // Check if navigate is defined
    if (typeof navigate === "undefined") {
      console.error(
        "navigate is not defined. Check your imports and/or your routing setup."
      );
    }

    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;

      const { data } = await deleteProduct(params._id);

      if (data?.error) {
        console.error(data.error);
        toast.error(data.error.message || "Delete failed. Try again.", {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        toast.success("Product deleted successfully", {
          position: "top-right",
          autoClose: 2000,
        });
        navigate("/admin/allproductslist", { replace: true });
      }
    } catch (err) {
      console.log(err);
      toast.error("Delete failed. Try again.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <div className="container xl:mx-[9rem] sm:mx-[0] mt-[5rem]">
        <div className="flex flex-col md:flex-row">
          <AdminMenu />
          <div className="md:w-3/4 p-3">
            <div className="text-2xl font-semibold mb-4">
              {t("Update / Delete Product")}
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
              <label className="text-dark-black py-2 px-4 block w-full text-center rounded-lg cursor-pointer font-semibold hover:shadow-lg transition-all ease-in-out duration-75">
                {t(`${images ? images.name : "Upload Image"}`)}
                <input
                  type="file"
                  name="images"
                  multiple
                  accept="image/*"
                  onChange={uploadFileHandler}
                  className="text-dark-black"
                />
              </label>
            </div>

            <div className="p-3">
              <div className="flex flex-wrap">
                <div className="one">
                  <label htmlFor="name">{t("Name")}</label> <br />
                  <input
                    type="text"
                    className="p-4 mb-3 w-[30rem] border rounded-lg transition-all ease-in-out duration-75 text-dark-black mr-[5rem] capitalize focus:outline-none"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="two">
                  <label htmlFor="actualPrice block">{t("Actual Price")}</label>{" "}
                  <br />
                  <input
                    type="number"
                    className="p-4 mb-3 w-[30rem] border rounded-lg transition-all ease-in-out duration-75 text-dark-black focus:outline-none"
                    value={actualPrice}
                    onChange={(e) => setActualPrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-wrap">
                <div>
                  <label htmlFor="discountPercentage block">
                    {t("Discount Percentage")}
                  </label>{" "}
                  <br />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="p-4 mb-3 w-[30rem] border rounded-lg transition-all ease-in-out duration-75 text-dark-black mr-[5rem] focus:outline-none"
                    value={discountPercentage}
                    onChange={(e) => setDiscountPercentage(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="quantity block">{t("Quantity")}</label> <br />
                  <input
                    type="number"
                    min="1"
                    className="p-4 mb-3 w-[30rem] border rounded-lg transition-all ease-in-out duration-75 text-dark-black mr-[5rem] focus:outline-none"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="name block">{t("Brand")}</label> <br />
                  <input
                    type="text"
                    className="p-4 mb-3 w-[30rem] border rounded-lg transition-all ease-in-out duration-75 text-dark-black focus:outline-none"
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
                className="p-2 mb-3 shadow-md hover:shadow-lg transition-all ease-in-out duration-75 border rounded-lg w-[97%] text-dark-black h-[8rem] focus:outline-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <br />

              <label htmlFor="" className="my-5">
                {t("Product Details")}
              </label>
              <br />
              {Object.keys(detail).map((key, index) => (
                <div key={index} className="mb-2">
                  <input
                    type="text"
                    placeholder={t("Property Name")}
                    defaultValue={key}
                    onChange={(e) => {
                      const newKey = e.target.value;
                      setDetail(({ [key]: value, ...rest }) => ({
                        ...rest,
                        [newKey]: value,
                      }));
                    }}
                    className="p-4 mb-3 w-[30rem] border rounded-lg shadow-md hover:shadow-lg transition-all ease-in-out duration-75 text-dark-black mr-10 capitalize focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder=""
                    value={detail[key]}
                    onChange={(e) => handleDetailChange(key, e.target.value)}
                    className="p-4 mb-3 w-[30rem] border rounded-lg shadow-md hover:shadow-lg transition-all ease-in-out duration-75 text-dark-black mr-10 capitalize focus:outline-none"
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
                <div>
                  <label htmlFor="name block">{t("Count In Stock")}</label>{" "}
                  <br />
                  <input
                    type="text"
                    className="p-4 mb-3 w-[30rem] border rounded-lg transition-all ease-in-out duration-75 text-dark-black mr-[5rem] focus:outline-none"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                <div className="flex flex-wrap">
                  <div className="three">
                    <label htmlFor="category">{t("Category")}</label> <br />
                    <select
                      className="p-4 mb-3 w-[30rem] border rounded-lg transition-all ease-in-out duration-75 text-dark-black mr-[5rem] focus:outline-none"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">{t("Select Category")}</option>
                      {categories.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="four">
                    <label htmlFor="subcategory">{t("Subcategory")}</label>{" "}
                    <br />
                    <select
                      className="p-4 mb-3 w-[30rem] border rounded-lg transition-all ease-in-out duration-75 text-dark-black mr-[5rem] focus:outline-none"
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                    >
                      <option value="">{t("Select Subcategory")}</option>
                      {subcategories.map((sc) => (
                        <option key={sc._id} value={sc._id}>
                          {sc.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="">
                <button
                  onClick={handleSubmit}
                  className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-dark-button-normal hover:bg-dark-button-hover  text-light-white mr-6"
                >
                  {t("Update")}
                </button>
                <button
                  onClick={handleDelete}
                  className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-dark-red-normal hover:bg-dark-red-hover  text-light-white"
                >
                  {t("Delete")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProductUpdate;
