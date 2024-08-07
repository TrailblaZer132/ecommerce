import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const SellerMenu = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <button
        className={`${
          isMenuOpen ? "top-2 right-2" : "top-5 right-7"
        } bg-[#626262] p-2 fixed rounded-lg z-10 mt-[5rem]`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes color="white" />
        ) : (
          <>
            <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
            <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
            <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
          </>
        )}
      </button>

      {isMenuOpen && (
        <section className="bg-[#949494] p-4 fixed right-7 top-5 mt-[5rem]">
          <ul className="list-none mt-2 ">
            
            
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-[#626262] rounded-sm transition ease-in-out"
                to="/seller/productlist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                {t("Create Product")}
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-[#626262] rounded-sm transition ease-in-out"
                to="/seller/allproductslist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                {t("All Products")}
              </NavLink>
            </li>
           
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-[#626262] rounded-sm transition ease-in-out"
                to="/seller/orderlist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                {t("Manage Orders")}
              </NavLink>
            </li>
          </ul>
        </section>
      )}
    </>
  );
};

export default SellerMenu;
