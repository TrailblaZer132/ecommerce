import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";
import { useTranslation } from "react-i18next";



const Shipping = () => {
  const { t } = useTranslation();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [phone, setPhone] = useState(shippingAddress.phone || "");
  const [fullname, setfulname] = useState(shippingAddress.fullname || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ fullname,address, city, postalCode, country,phone}));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  // Payment
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  return (
    <div className="container mx-auto  mt-[5rem]">
      <ProgressSteps step1 step2 />
      <div className="mt-[2rem] flex justify-around items-center flex-wrap">
        <form onSubmit={submitHandler} className="w-[40rem]">
          <h1 className="text-2xl font-semibold mb-4">{t("Shipping")}</h1>
          <div className="mb-4">
            <label className="block text-dark-gray mb-2">
              {t("Full Name  (First and Last name)")}
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded outline-none"
              placeholder=""
              value={fullname}
              required
              onChange={(e) => setfulname(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-dark-gray mb-2">{t("Address")}</label>
            <input
              type="text"
              className="w-full p-2 border rounded outline-none"
              placeholder=""
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-dark-gray mb-2">{t("City")}</label>
            <input
              type="text"
              className="w-full p-2 border rounded outline-none"
              placeholder=""
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-dark-gray mb-2">
              {t("Phone Number")}
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded outline-none"
              placeholder=""
              value={phone}
              required
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-dark-gray mb-2">
              {t("Postal Code")}
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded outline-none"
              placeholder=""
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-dark-gray mb-2">{t("Country")}</label>
            <input
              type="text"
              className="w-full p-2 border rounded outline-none"
              placeholder=""
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-dark-gray">{t("Select Method")}</label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-dark-red-normal accent-dark-red-normal"
                  name="paymentMethod"
                  value="PayPal"
                  checked={paymentMethod === "PayPal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />

                <span className="ml-2">PayPal or Credit Card</span>
              </label>
            </div>
          </div>

          <button
            className="bg-dark-red-normal text-light-white py-2 px-4 rounded-full text-lg w-full"
            type="submit"
          >
            {t("Continue")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
