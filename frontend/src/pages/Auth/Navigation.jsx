import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiOutlineTranslation,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import { useTranslation } from "react-i18next";
import LanguageDropdown from "../../components/LanguageDropdown";
import FavoritesCount from "../../pages/Products/FavoritesCount";

const Navigation = () => {
  const { t } = useTranslation();
  const { userInfo } = useSelector((state) => state.auth);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{ zIndex: 9999 }}
      className={`${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-[#1a1a1a] w-[4%] hover:w-[15%] h-[100vh]  fixed `}
      id="navigation-container"
      onMouseLeave={() => setDropdownOpen(false)}
    >
      <div className="flex flex-col justify-center space-y-4">
        <Link
          to="/"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">
            {t("HOME")}
          </span>{" "}
        </Link>

        <Link
          to="/shop"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">
            {t("SHOP")}
          </span>{" "}
        </Link>

        <Link to="/cart" className="flex relative">
          <div className="flex items-center transition-transform transform hover:translate-x-2">
            <AiOutlineShoppingCart className="mt-[3rem] mr-2" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">
              {t("CART")}
            </span>{" "}
          </div>
        </Link>

        <Link to="/favorite" className="flex relative">
          <div className="flex items-center transition-transform transform hover:translate-x-2">
            <FaHeart className="mt-[3rem] mr-2" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">
              {t("FAVOURITES")}
            </span>{" "}
            <FavoritesCount />
          </div>
        </Link>

        <>
          <div className="flex items-center transition-transform transform hover:translate-x-2">
            <AiOutlineTranslation className="mt-[3rem] mr-2" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">
              <LanguageDropdown />
            </span>{" "}
          </div>
        </>
      </div>

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center text-gray-800 focus:outline-none"
        >
          {userInfo ? (
            <span className="text-white">{userInfo.username}</span>
          ) : (
            <></>
          )}

          {userInfo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${
                dropdownOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>

        {dropdownOpen && userInfo && (
          <ul
            className={`absolute rounded right-0 mt-2 mr-14 space-y-2 bg-white text-gray-600 ${
              !userInfo.isAdmin ? "-top-20" : "-top-80"
            } `}
          >
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="rounded block px-4 py-2 hover:bg-gray-200"
                  >
                    {t("Dashboard")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlist"
                    className="rounded block px-4 py-2 hover:bg-gray-200"
                  >
                    {t("Products")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    className="rounded block px-4 py-2 hover:bg-gray-200"
                  >
                    {t("Categories")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="rounded block px-4 py-2 hover:bg-gray-200"
                  >
                    {t("Orders")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    className="rounded block px-4 py-2 hover:bg-gray-200"
                  >
                    {t("Users")}
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link
                to="/profile"
                className="rounded block px-4 py-2 hover:bg-gray-200"
              >
                {t("Profile")}
              </Link>
            </li>
            <li>
              <Link
                to="/logout"
                onClick={logoutHandler}
                className="rounded block px-4 py-2 hover:bg-gray-200"
              >
                {t("Logout")}
              </Link>
            </li>
          </ul>
        )}
      </div>

      {!userInfo && (
        <ul>
          <li>
            <Link
              to="/login"
              className="flex items-center transition-transform transform hover:translate-x-2"
            >
              <AiOutlineLogin className="mr-2 mt-[3rem]" size={26} />
              <span className="hidden nav-item-name mt-[3rem]">
                {t("LOGIN")}
              </span>{" "}
            </Link>
          </li>

          <li>
            <Link
              to="/register"
              className="flex items-center transition-transform transform hover:translate-x-2"
            >
              <AiOutlineUserAdd className="mr-2 mt-[3rem]" size={26} />
              <span className="hidden nav-item-name mt-[3rem]">
                {t("REGISTER")}
              </span>{" "}
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navigation;
