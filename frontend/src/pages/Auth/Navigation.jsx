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
  const [clickCount, setClickCount] = useState(0);
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

  const handleLogoClick = () => {
    setClickCount((prevCount) => prevCount + 1);

    if (clickCount === 4) {
      // Display the popup
      alert("We are the creators of the website:\nUdit Nath\nKhiranjit Kumar Deka\nAnurag Kumar");
      // Reset the click count
      setClickCount(0);
    }
  };

  return (
    <div
      style={{ zIndex: 999 }}
      className={`${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:flex sm:flex flex-row justify-between items-center p-4 text-light-white bg-dark-red-normal w-full h-12 fixed`}
      id="navigation-container"
      onMouseLeave={() => setDropdownOpen(false)}
    >
      <div className="flex items-center space-x-3 rtl:space-x-reverse">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
            onClick={handleLogoClick}
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-light-white">
            E-Meghalaya
          </span>
        </a>
      </div>
      <div className="flex flex-grow justify-center">
        <input
          type="text"
          placeholder={t("Search")}
          className="py-2 flex-grow px-4 w-96 h-10 rounded-xl bg-light-white text-light-gray"
        />
      </div>

      <div className="flex items-center space-x-6">
        <div className="navigation-container">
          <Link to="/shop" className="nav-link hover:text-dark-yellow">
            <AiOutlineShopping size={26} />
            <span className="nav-item-name">{t("Shop")}</span>
          </Link>
        </div>
        <div className="navigation-container">
          <Link to="/cart" className="nav-link relative hover:text-dark-yellow">
            <AiOutlineShoppingCart size={26} />
            <span className="nav-item-name">{t("Cart")}</span>
            <div className="absolute top-0">
              {cartItems.length > 0 && (
                <span className="px-1 py-0 text-sm text-white bg-dark-green-normal rounded-full">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </div>
          </Link>
        </div>
        <div className="navigation-container">
          <Link
            to="/favorite"
            className="nav-link relative hover:text-dark-yellow"
          >
            <FaHeart size={26} />
            <span className="nav-item-name pl-1">{t("Favourites")}</span>
            <FavoritesCount />
          </Link>
        </div>
        <div className="navigation-container">
          <div className="nav-link hover:text-dark-yellow">
            <AiOutlineTranslation size={26} />
            <span className="nav-item-name">
              <LanguageDropdown />
            </span>
          </div>
        </div>

        {userInfo ? (
          <div className="relative flex items-center">
            <button
              onClick={toggleDropdown}
              className="flex items-center text-gray-800 focus:outline-none"
            >
              <span className="text-white">{userInfo.username}</span>
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
        ) : (
          <div>
            <div>
              <Link to="/login" className="nav-link">
                <AiOutlineLogin size={26} />
                <span className="nav-item-name">{t("Login")}</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
