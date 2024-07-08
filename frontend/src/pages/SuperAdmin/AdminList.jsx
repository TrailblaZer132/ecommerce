// frontend/src/pages/SuperAdmin/AdminList.jsx
import React, { useEffect, useState } from "react";
import {
  useDeleteAdminMutation,
  useGetUsersQuery,
} from "../../redux/api/usersApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import AdminMenu from "../Admin/AdminMenu";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const AdminList = () => {
  const { t } = useTranslation();
  const [deleteAdmin] = useDeleteAdminMutation();
  const { data: admins, refetch, isLoading, error } = useGetUsersQuery();

  const handleDeleteAdmin = async (userId) => {
    if (window.confirm(t("Are you sure?"))) {
      try {
        const response = await deleteAdmin(userId).unwrap(); // Pass userId to the mutation
        console.log("Delete response:", response); // For debugging
        refetch();
        toast.success(t("Admin deleted successfully"));
      } catch (err) {
        console.log("Delete admin error:", err); // For debugging
        toast.error(err.data?.message || err.error || "An error occurred");
      }
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <Loader />;
  if (error) return <Message variant="danger">{error.toString()}</Message>;

  return (
    <div className="p-4 mt-[5rem]">
      <AdminMenu />
      <h1 className="text-2xl font-semibold mb-4 text-center p-4">
        {t("Admin List")}
      </h1>
      <div>
        {admins.map((admin) => (
          <div
            key={admin._id}
            className="flex justify-between items-center p-2 m-2 border-b"
          >
            <span>{admin.username}</span>
            <button
              onClick={() => handleDeleteAdmin(admin._id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              {t("Delete")}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminList;
