import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation, useGetPaypalClientIdQuery, usePayOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";
import { useTranslation } from "react-i18next";


const PlaceOrder = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const [payOrder] = usePayOrderMutation(); // Add payOrder mutation
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "INR",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      if (cart && !cart.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, cart, paypal, paypalDispatch]);

  const placeOrderHandler = async () => {
    if (cart.cartItems.length === 0) {
      toast.error("No order items");
      return;
    }

    try {
      const orderData = {
        orderItems: cart.cartItems.map((item) => ({
          product: item._id,
          sellerId: item.sellerId,
          name: item.name,
          image: item.images[0],
          qty: item.qty,
          actualPrice: item.actualPrice,
          discountPercentage: item.discountPercentage,
          price: (
            item.actualPrice *
            (1 - item.discountPercentage / 100)
          ).toFixed(2),
        })),
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      };

      const res = await createOrder(orderData).unwrap();
      dispatch(clearCartItems());

      return res._id; // Return order ID for further processing
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error(error.data?.error || "An error occurred while placing the order");
    }
  };

  const onApprove = async (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        const orderId = await placeOrderHandler();
        if (orderId) {
          // Mark the order as paid
          await payOrder({ orderId, details });

          toast.success("Order is paid");
          navigate(`/order/${orderId}`);
        }
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  };

  const paypalCreateOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: cart.totalPrice } }],
      })
      .then((orderID) => {
        return orderID;
      });
  };

  const onError = (err) => {
    toast.error(err.message);
  };

  return (
    <>
      <ProgressSteps step1 step2 step3 />
      <div className="container mx-auto mt-8">
        {cart.cartItems.length === 0 ? (
          <Message>{t("Your cart is empty")}</Message>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <td className="px-1 py-2 text-left align-top">{t("Image")}</td>
                  <td className="px-1 py-2 text-left">{t("Product")}</td>
                  <td className="px-1 py-2 text-left">{t("Quantity")}</td>
                  <td className="px-1 py-2 text-left">{t("Price")}</td>
                  <td className="px-1 py-2 text-left">{t("Total")}</td>
                </tr>
              </thead>
              <tbody>
                {cart.cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-16 h-16 object-cover"
                      />
                    </td>
                    <td className="p-2">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </td>
                    <td className="p-2">{item.qty}</td>
                    <td className="p-2">
                      ₹ {(item.actualPrice * (1 - item.discountPercentage / 100)).toFixed(2)}
                    </td>
                    <td className="p-2">
                      ₹ {(item.qty * item.actualPrice * (1 - item.discountPercentage / 100)).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-5">{t("Order Summary")}</h2>
          <div className="flex justify-between flex-wrap p-8 bg-light-lightRed rounded-xl">
            <ul className="text-lg">
              <li>
                <span className="font-semibold mb-4">{t("Items")} </span>
                {cart.cartItems.reduce((acc, item) => acc + item.qty, 0)}
              </li>
              <li>
                <span className="font-semibold mb-4">{t("Shipping")} </span> ₹
                {cart.shippingPrice}
              </li>
              <li>
                <span className="font-semibold mb-4">{t("Tax")} </span> ₹
                {cart.taxPrice}
              </li>
              <li>
                <span className="font-semibold mb-4">{t("Total")} </span> ₹
                {cart.totalPrice}
              </li>
            </ul>

            {error && <Message variant="danger">{error.data.message}</Message>}

            <div>
              <h2 className="text-2xl font-semibold mb-4">{t("Shipping")}</h2>
              <p>
              <p><strong>{t("Name")} </strong> {cart.shippingAddress.fullname}</p>
              <p><strong>{t("Contact")} </strong> {cart.shippingAddress.phone}</p>
                <strong>{t("Address")} </strong> {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">{t("Payment Method")}</h2>
              <strong>{t("Method")} </strong> {cart.paymentMethod}
            </div>
          </div>
          <div>
          {isLoading && <Loader />}
            {isPending ? (
              <Loader />
            ) : (
              <div className="mt-8 ml-[25%]"><PayPalButtons createOrder={paypalCreateOrder} onApprove={onApprove} onError={onError} /></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
