import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";
import { useTranslation } from "react-i18next";

const Cart = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    // Calculate the discounted price
    const discountedPrice =
      product.actualPrice * (1 - product.discountPercentage / 100);

    // Add the product to the cart with the discounted price
    dispatch(addToCart({ ...product, price: discountedPrice, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      <div className="container flex justify-around items-start flex-wrap mx-auto mt-[5rem]">
        {cartItems.length === 0 ? (
          <div>
            {t("Your cart is empty")}{" "}
            <Link to="/shop" className="text-dark-green-normal">
              {t("Go To Shop")}
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col w-[80%]">
              <h1 className="text-2xl font-semibold mb-4">
                {t("Shopping Cart")}
              </h1>

              {cartItems.map((item) => (
                <div key={item._id} className="flex items-enter mb-[1rem] pb-2">
                  <div className="w-[5rem] h-[5rem]">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  <div className="flex-1 ml-4">
                    <Link
                      to={`/product/${item._id}`}
                      className="text-slate-800 font-semibold"
                    >
                      {item.name}
                    </Link>

                    <div className="mt-2 text-dark-black">{item.brand}</div>
                    <div className="mt-2 text-dark-black font-bold">
                      ₹ {(item.actualPrice * (1 - item.discountPercentage / 100)).toFixed(2)}
                    </div>
                  </div>

                  <div className="w-24">
                    <select
                      className="w-full p-1 border rounded text-dark-black"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <button
                      className="text-dark-red-normal mr-[5rem]"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash className="ml-[1rem] mt-[.5rem]" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="mt-8 w-[40rem]">
                <div className="p-4 rounded-lg">
                  <h2 className="text-xl font-semibold mb-2">
                    {t("Items")} (
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  </h2>

                  <div className="text-2xl font-bold">
                    ₹{" "}
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.actualPrice * (1 - item.discountPercentage / 100), 0)
                      .toFixed(2)}
                  </div>

                  <button
                    className="bg-dark-green-normal mt-4 py-2 px-4 rounded-full text-lg w-3/6 text-white hover:bg-dark-green-hover"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    {t("Proceed To Checkout")}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
