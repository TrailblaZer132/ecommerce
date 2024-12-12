import { useState } from "react";
import {
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiOutlineTranslation,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { FaHeart, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { useGetProductsQuery } from "../../redux/api/productApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import { useTranslation } from "react-i18next";
import LanguageDropdown from "../../components/LanguageDropdown";
import FavoritesCount from "../../pages/Products/FavoritesCount";
import logo from "../../Utils/images/logo.png";
const Navigation = () => {
  const { t } = useTranslation();
  const [clickCount, setClickCount] = useState(0);
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const {
    data: suggestions,
    isFetching: isSearching,
    error: searchError,
  } = useGetProductsQuery({ keyword: searchTerm }, { skip: !searchTerm });

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

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
      alert(
        "We are the creators of the website:\nUdit Nath uditjeet@gmail.com\nKhiranjit Kumar Deka\nAnurag Kumar"
      );
      // Reset the click count
      setClickCount(0);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleMobileDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
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
            src={logo}
            className="h-8"
            alt="Flowbite Logo"
            onClick={handleLogoClick}
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-light-white">
            Meghali
          </span>
        </a>
      </div>
      <div className="flex flex-grow justify-center relative">
        <input
          type="text"
          placeholder={t("Search")}
          className="py-2 flex-grow px-4 w-96 h-9 rounded-3xl bg-light-white text-black focus:outline-none xs:w-24 sm:w-28 md:w-40"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        {isSearching && <div>Loading...</div>}
        {searchError && <div>Error loading suggestions</div>}
        {searchTerm && suggestions?.products?.length > 0 && (
          <ul className="absolute top-full mt-1 w-full bg-white text-black shadow-lg max-h-60 overflow-auto">
            {suggestions.products.map((product) => (
              <li
                key={product._id}
                className="p-2 hover:bg-gray-200 cursor-pointer"
              >
                <Link
                  to={`/product/${product._id}`}
                  onClick={() => setSearchTerm("")}
                >
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex">
          <div className="navigation-container">
            <Link
              to="/shop"
              className="nav-link hover:text-dark-yellow hidden lg:inline-flex"
            >
              <AiOutlineShopping size={26} />
              <span className="nav-item-name">{t("Shop")}</span>
            </Link>
          </div>
          <div className="navigation-container">
            <Link
              to="/cart"
              className="nav-link relative hover:text-dark-yellow hidden lg:inline-flex"
            >
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
              className="nav-link relative hover:text-dark-yellow hidden lg:inline-flex"
            >
              <FaHeart size={26} />
              <span className="nav-item-name pl-1">{t("Favourites")}</span>
              <FavoritesCount />
            </Link>
          </div>
          <div className="navigation-container">
            <div className="nav-link hover:text-dark-yellow hidden lg:inline-flex">
              <AiOutlineTranslation size={26} />
              <span className="nav-item-name">
                <LanguageDropdown />
              </span>
            </div>
          </div>
        </div>

        {userInfo ? (
          <div className="relative flex items-center">
            <button
              onClick={toggleDropdown}
              className="flex items-center text-gray-800 focus:outline-none"
            >
              <span className="text-white hover:text-dark-yellow">
                {userInfo.username}
              </span>
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
              <ul className="dropdown-menu w-52">
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
                    {/* <li>
                      <Link
                        to="/admin/productlist"
                        className="rounded block px-4 py-2 hover:bg-gray-200"
                      >
                        {t("Products")}
                      </Link>
                    </li> */}
                    <li>
                      <Link
                        to="/admin/categorylist"
                        className="rounded block px-4 py-2 hover:bg-gray-200"
                      >
                        {t("Categories")}
                      </Link>
                    </li>
                    {/* <li>
                      <Link
                        to="/admin/orderlist"
                        className="rounded block px-4 py-2 hover:bg-gray-200"
                      >
                        {t("Orders")}
                      </Link>
                    </li> */}
                    <li>
                      <Link
                        to="/admin/Aplicationlist"
                        className="rounded block px-4 py-2 hover:bg-gray-200"
                      >
                        {t("Applications")}
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
                {userInfo.isSeller && (
                  <>
                    <li>
                      <Link
                        to="/seller/productlist"
                        className="rounded block px-4 py-2 hover:bg-gray-200"
                      >
                        {t("Products")}
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/seller/orderlist"
                        className="rounded block px-4 py-2 hover:bg-gray-200"
                      >
                        {t("Orders")}
                      </Link>
                    </li>
                    {/* <li>
                      <Link
                        to="/seller/order/:id/delivery-status"
                        className="rounded block px-4 py-2 hover:bg-gray-200"
                      >
                        {t("Delivery Status")}
                      </Link>
                    </li> */}
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

                {userInfo && !userInfo.isAdmin && !userInfo.isSuperAdmin && (
                  <ul>
                    <li>
                      <Link
                        to="/chat"
                        className="rounded block px-4 py-2 hover:bg-gray-200"
                      >
                        {t("Chat Dashboard")}
                      </Link>
                    </li>
                  </ul>
                )}

                {userInfo.isSeller && (
                  <li>
                    <Link
                      to="/sellerRegistration"
                      className="rounded block px-4 py-2 hover:bg-gray-200"
                    >
                      {t("Become a Seller")}
                    </Link>
                  </li>
                )}

                {/* {userInfo && userInfo.isChatSupport && (
                  <ul>
                    <li>
                      <Link to="/chat" className="nav-link">
                        {t("Chat Dashboard")}
                      </Link>
                    </li>
                  </ul>
                )} */}

                {userInfo.isSuperAdmin && (
                  <ul>
                    <li>
                      <Link
                        to="/adminRegistration"
                        className="rounded block px-4 py-2 hover:bg-gray-200"
                      >
                        {t("Admin Registration")}
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/adminList"
                        className="rounded block px-4 py-2 hover:bg-gray-200"
                      >
                        {t("Admin List")}
                      </Link>
                    </li>
                  </ul>
                )}

                {userInfo.isSeller == false &&
                  userInfo.isAdmin == false &&
                  userInfo.isSuperAdmin == false &&
                  userInfo.isChatSupport == false && (
                    <li>
                      <Link
                        to="/sellerRegistration"
                        className="rounded block px-4 py-2 hover:bg-gray-200"
                      >
                        {t("Become a Seller")}
                      </Link>
                    </li>
                  )}

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

        <button
          className="md:inline-flex sm:inline-flex h-10 w-10 items-center justify-center  text-light-white lg:hidden xl:hidden 2xl:hidden 3xl:hidden 4xl:hidden"
          onClick={toggleMobileDropdown}
        >
          {isDropdownVisible && (
            <div
              className="dropdown-menu  text-dark-gray rounded w-40 flex flex-col"
              style={{ textAlign: "left" }}
            >
              <Link to="/shop" className="dropdown-item">
                <AiOutlineShopping size={20} className="mr-2 inline" />
                Shop
              </Link>
              <Link to="/cart" className="dropdown-item">
                <AiOutlineShoppingCart size={20} className="mr-2 inline" />
                Cart
              </Link>
              <Link to="/favorite" className="dropdown-item">
                <FaHeart size={20} className="mr-2 inline" />
                Favourites
              </Link>
              <Link className="dropdown-item" to="">
                <AiOutlineTranslation size={20} className="mr-2 inline" />
                <LanguageDropdown />
              </Link>
            </div>
          )}

          {isDropdownVisible ? (
            <AiOutlineClose size={20} />
          ) : (
            <AiOutlineMenu size={20} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Navigation;
