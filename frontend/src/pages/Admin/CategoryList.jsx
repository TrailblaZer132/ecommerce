import { useState } from "react";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../redux/api/categoryApiSlice";

import { toast } from "react-toastify";
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";
import AdminMenu from "./AdminMenu";
import { useTranslation } from "react-i18next";

const CategoryList = () => {
  const { t } = useTranslation();
  const { data: categories, refetch } = useFetchCategoriesQuery();
  const [name, setName] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [updatingSubcategories, setUpdatingSubcategories] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Please enter category name");
      return;
    }
    try {
      const result = await createCategory({ name, subcategories }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        setSubcategories([]);
        toast.success("Category created successfully");
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create category");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!updatingName) {
      toast.error("Please enter category name");
      return;
    }
    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: {
          name: updatingName,
          subcategories: updatingSubcategories,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} updated successfully`);
        setSelectedCategory(null);
        setUpdatingName("");
        setUpdatingSubcategories([]);
        setModalVisible(false);
        refetch();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.error(`${result.name} deleted successfully`);
        setSelectedCategory(null);
        setModalVisible(false);
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete category");
    }
  };

  return (
    <div className="ml-[10rem] flex-col md:flex-row mt-[5rem]">
      <AdminMenu />
      <div className="md:w-3/4 p-3">
        <div className="text-xl font-semibold mb-4">
          {t("Manage Categories")}
        </div>
        <CategoryForm
          value={name}
          setValue={t(`${setName}`)}
          subcategories={subcategories}
          setSubcategories={setSubcategories}
          handleSubmit={handleCreateCategory}
        />
        <br />
        <hr />

        <div className="flex flex-wrap">
          {categories?.map((category) => (
            <div key={category._id}>
              <button
                className="bg-white border border-dark-red-normal text-dark-red-normal py-2 px-4 rounded-lg m-3 hover:bg-dark-red-normal hover:text-white focus:outline-none focus:ring-2 focus:ring-dark-red-normal focus:ring-opacity-50"
                onClick={() => {
                  setModalVisible(true);
                  setSelectedCategory(category);
                  setUpdatingName(category.name);
                  setUpdatingSubcategories(category.subcategories || []);
                }}
              >
                {t(`${category.name}`)}
              </button>
            </div>
          ))}
        </div>
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <CategoryForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            subcategories={updatingSubcategories}
            setSubcategories={setUpdatingSubcategories}
            handleSubmit={handleUpdateCategory}
            buttonText="Update"
            handleDelete={handleDeleteCategory}
          />
        </Modal>
      </div>
    </div>
  );
};

export default CategoryList;
