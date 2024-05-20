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

  const { data: productData } = useGetProductByIdQuery(params._id);

  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [detail, setDetail] = useState(productData?.description || {});

  const [price, setPrice] = useState(productData?.price || "");
  const [category, setCategory] = useState(productData?.category?._id || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [stock, setStock] = useState(productData?.countInStock || 0);

  const navigate = useNavigate();
  const { data: categories = [] } = useFetchCategoriesQuery();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setDetail(productData.detail || {});
      setPrice(productData.price);
      setCategory(productData.category?._id);
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImage(productData.image);
      setStock(productData.countInStock);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Item added successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      setImage(res.image);
    } catch (err) {
      toast.success("Item added successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleDetailChange = (key, value) => {
    setDetail((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAddDetailField = () => {
    const newKey = `newKey${Object.keys(detail).length}`;
    setDetail((prev) => ({
      ...prev,
      [newKey]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("detail", JSON.stringify(detail));
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      const data = await updateProduct({ productId: params._id, formData });

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
      <div className="container xl:mx-[9rem] sm:mx-[0]">
        <div className="flex flex-col md:flex-row">
          <AdminMenu />
          <div className="md:w-3/4 p-3">
            <div className="text-2xl font-semibold mb-4">
              {t("Update / Delete Product")}
            </div>

            {image && (
              <div className="text-center">
                <img
                  src={image}
                  alt="product"
                  className="block mx-auto w-[25%] max-h-[25%]"
                />
              </div>
            )}

            <div className="mb-3">
              <label className="text-white py-2 px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11 hover:shadow-lg transition-all ease-in-out duration-75">
                {t(`${image ? image.name : "Upload Image"}`)}
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={uploadFileHandler}
                  className="text-white"
                />
              </label>
            </div>

            <div className="p-3">
              <div className="flex flex-wrap">
                <div className="one">
                  <label htmlFor="name">{t("Name")}</label> <br />
                  <input
                    type="text"
                    className="p-4 mb-3 w-[30rem] border rounded-lg transition-all ease-in-out duration-75 text-black mr-[5rem] capitalize"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="two">
                  <label htmlFor="name block">{t("Price")}</label> <br />
                  <input
                    type="number"
                    className="p-4 mb-3 w-[30rem] border rounded-lg transition-all ease-in-out duration-75 text-black"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-wrap">
                <div>
                  <label htmlFor="name block">{t("Quantity")}</label> <br />
                  <input
                    type="number"
                    min="1"
                    className="p-4 mb-3 w-[30rem] border rounded-lg transition-all ease-in-out duration-75 text-black mr-[5rem]"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="name block">{t("Brand")}</label> <br />
                  <input
                    type="text"
                    className="p-4 mb-3 w-[30rem] border rounded-lg transition-all ease-in-out duration-75 text-black"
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
              <br />

              <label htmlFor="" className="my-5">
                {t("Product Details")}
              </label>
              <br />
              {Object.keys(detail).map((key) => (
                <div key={key} className="mb-2">
                  <input
                    type="text"
                    placeholder={t("Property Name")}
                    value={key}
                    readOnly
                    className="p-4 mb-3 w-[30rem] border rounded-lg shadow-md hover:shadow-lg transition-all ease-in-out duration-75 text-black mr-10"
                  />
                  <input
                    type="text"
                    placeholder=""
                    value={detail[key]}
                    onChange={(e) => handleDetailChange(key, e.target.value)}
                    className="p-4 mb-3 w-[30rem] border rounded-lg shadow-md hover:shadow-lg transition-all ease-in-out duration-75 text-black mr-10"
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
                  <label htmlFor="name block">{t("Count In Stock")}</label>{" "}
                  <br />
                  <input
                    type="text"
                    className="p-4 mb-3 w-[30rem] border rounded-lg transition-all ease-in-out duration-75 text-black mr-[5rem]"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="">{t("Category")}</label> <br />
                  <select
                    placeholder="Choose Category"
                    className="p-4 mb-3 w-[30rem] border rounded-lg transition-all ease-in-out duration-75 text-black mr-[5rem]"
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

              <div className="">
                <button
                  onClick={handleSubmit}
                  className="py-4 px-10 mt-5 rounded-lg text-lg font-bold  hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 text-white mr-6"
                >
                  {t("Update")}
                </button>
                <button
                  onClick={handleDelete}
                  className="py-4 px-10 mt-5 rounded-lg text-lg font-bold  hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 text-white"
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
