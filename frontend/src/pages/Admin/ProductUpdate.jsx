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

const AdminProductUpdate = () => {
  const params = useParams();

  const { data: productData } = useGetProductByIdQuery(params._id);

  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [details, setDetails] = useState(productData?.details || {});

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
      setDetails(productData.details || {});
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
      toast.success("Image uploaded successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      setImage(res.image);
    } catch (err) {
      toast.success("Imge upload failed", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleDetailsChange = (key, value) => {
    setDetails((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAddDetailsField = () => {
    const newKey = `newKey${Object.keys(details).length}`;
    setDetails((prev) => ({
      ...prev,
      [newKey]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = {
        image,
        name,
        description,
        details,
        price,
        category,
        quantity,
        brand,
        countInStock: stock,
      };

      const data = await updateProduct({
        productId: params._id,
        ...updatedProduct,
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
      <div className="container xl:mx-[9rem] sm:mx-[0]">
        <div className="flex flex-col md:flex-row">
          <AdminMenu />
          <div className="md:w-3/4 p-3">
            <div className="h-12">Update / Delete Product</div>

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
              <label className="text-white py-2 px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
                {image ? image.name : "Upload image"}
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
                  <label htmlFor="name">Name</label> <br />
                  <input
                    type="text"
                    className="p-4 mb-3 w-[30rem] border rounded-lg transition-all ease-in-out duration-75 text-black mr-[5rem] capitalize"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="two">
                  <label htmlFor="price">Price</label> <br />
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
                  <label htmlFor="quantity">Quantity</label> <br />
                  <input
                    type="number"
                    min="1"
                    className="p-4 mb-3 w-[30rem] border rounded-lg transition-all ease-in-out duration-75 text-black mr-[5rem]"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="brand">Brand</label> <br />
                  <input
                    type="text"
                    className="p-4 mb-3 w-[30rem] border rounded-lg transition-all ease-in-out duration-75 text-black"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
              </div>

              <label htmlFor="description" className="my-5">
                Description
              </label>
              <textarea
                type="text"
                className="p-2 mb-3 transition-all ease-in-out duration-75  border rounded-lg w-[95%] text-black"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <br />

              <label htmlFor="details" className="my-5">
                Details
              </label>
              <br />
              {Object.keys(details).map((key) => (
                <div key={key} className="mb-2">
                  <input
                    type="text"
                    placeholder="Key"
                    value={key}
                    className="p-4 mb-3 w-[30rem] border rounded-lg shadow-md hover:shadow-lg transition-all ease-in-out duration-75 text-black mr-10"
                  />
                  <input
                    type="text"
                    placeholder="Value"
                    value={details[key]}
                    onChange={(e) => handleDetailsChange(key, e.target.value)}
                    className="p-4 mb-3 w-[30rem] border rounded-lg shadow-md hover:shadow-lg transition-all ease-in-out duration-75 text-black mr-10"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddDetailsField}
                className="py-2 px-4 mt-2 mb-4 rounded-lg text-sm font-semibold bg-cyan-400 text-white hover:bg-cyan-500 transition-all ease-in-out duration-75"
              >
                Add Field
              </button>

              <div className="flex justify-between">
                <div>
                  <label htmlFor="countInStock">Count In Stock</label> <br />
                  <input
                    type="text"
                    className="p-4 mb-3 w-[30rem] border rounded-lg transition-all ease-in-out duration-75 text-black mr-[5rem]"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="">Category</label> <br />
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
                  Update
                </button>
                <button
                  onClick={handleDelete}
                  className="py-4 px-10 mt-5 rounded-lg text-lg font-bold  hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 text-white"
                >
                  Delete
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
