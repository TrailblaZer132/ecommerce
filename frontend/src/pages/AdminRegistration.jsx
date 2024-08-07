// In frontend/src/pages/AdminRegistration.jsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRegisterAdminMutation } from "../redux/api/usersApiSlice";
import { setCredentials } from "../redux/features/auth/authSlice";
import Loader from "../components/Loader";
import "../pages/Auth/register.css"; // Assuming you want to use the same styling
import { useTranslation } from "react-i18next";

const AdminRegistration = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    pincode: "",
  });
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [registerAdmin, { isLoading }] = useRegisterAdminMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerAdmin(formData).unwrap();
      toast.success("Admin registered successfully");
      navigate("/adminRegistration"); 
    } catch (error) {
      console.log(error);
      console.error(error);
      toast.error(error.data.message || "Failed to register admin");
    }
  };

  return (
    <div className="register-section">
      <section className="register-container">
        <div className="register-form">
          <h1>{t("Admin Registration")}</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">{t("Email Address")}</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">{t("Name")}</label>
              <input
                type="text"
                name="username"
                id="username"
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">{t("Password")}</label>
              <input
                type="password"
                name="password"
                id="password"
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="pincode">{t("Zone")}</label>
              <input
                type="text"
                name="pincode"
                id="pincode"
                required
                onChange={handleChange}
              />
            </div>
            {isLoading && <Loader />}
            <br />
            <br />
            <button type="submit">{t("Register")}</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AdminRegistration;
