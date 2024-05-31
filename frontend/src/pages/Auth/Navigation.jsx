import { useState } from "react";
import {
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
  const { cartItems } = useSelector((state) => state.cart);

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
      } xl:flex lg:flex md:flex sm:flex flex-row justify-between p-4 text-white bg-blue-800 w-full h-12 fixed`}
      id="navigation-container"
      onMouseLeave={() => setDropdownOpen(false)}
    >
      <div className="flex flex-row items-center space-x-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            E-Meghalaya
          </span>
        </a>
      </div>
      <div className="flex flex-row items-center space-x-10">
        <input
          type="text"
          placeholder="Search..."
          className="mr-[25rem] py-2 px-[1rem] w-[30rem] h-[2.5rem] rounded-xl bg-white text-gray-500"
        />

        <Link to="/shop" className="nav-link">
          <AiOutlineShopping size={26} />
          <span className="nav-item-name">{t("SHOP")}</span>
        </Link>

        <Link to="/cart" className="nav-link relative">
          <AiOutlineShoppingCart size={26} />
          <span className="nav-item-name">{t("CART")}</span>
          <div className="absolute top-0">
            {cartItems.length > 0 && (
              <span>
                <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              </span>
            )}
          </div>
        </Link>

        <Link to="/favorite" className="nav-link relative">
          <FaHeart size={26} />
          <span className="nav-item-name">{t("FAVOURITES")}</span>
          <FavoritesCount />
        </Link>

        <div className="nav-link">
          <AiOutlineTranslation size={26} />
          <span className="nav-item-name">
            <LanguageDropdown />
          </span>
        </div>
      </div>

      <div className="relative flex items-center">
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
          <ul className="dropdown-menu">
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
        <ul className="flex flex-row space-x-4">
          <li>
            <Link to="/login" className="nav-link">
              <AiOutlineLogin size={26} />
              <span className="nav-item-name">{t("LOGIN")}</span>
            </Link>
          </li>

          <li>
            <Link to="/register" className="nav-link">
              <AiOutlineUserAdd size={26} />
              <span className="nav-item-name">{t("REGISTER")}</span>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navigation;
