// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useTranslation } from "react-i18next";

// const Purchase = () => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const cart = useSelector((state) => state.cart);
//   const { cartItems } = cart;

//   const checkoutHandler = () => {
//     navigate("/login?redirect=/shipping");
//   };

//   return (
//     <>
//       <div className="container mx-auto mt-[5rem]">
//         {cartItems.length === 0 ? (
//           <div>
//             {t("Your cart is empty")}{" "}
//             <Link to="/shop" className="text-dark-green-normal">
//               {t("Go To Shop")}
//             </Link>
//           </div>
//         ) : (
//           <div className="w-[80%] mx-auto">
//             <h1 className="text-2xl font-semibold mb-4">{t("Order Summary")}</h1>

//             <div className="p-4 rounded-lg border">
//               <h2 className="text-xl font-semibold mb-2">
//                 {t("Items")} (
//                 {cartItems.reduce((acc, item) => acc + item.qty, 0)})
//               </h2>

//               <div className="text-2xl font-bold">
//                 ₹{" "}
//                 {cartItems
//                   .reduce(
//                     (acc, item) =>
//                       acc +
//                       item.qty * item.actualPrice * (1 - item.discountPercentage / 100),
//                     0
//                   )
//                   .toFixed(2)}
//               </div>

//               <button
//                 className="bg-dark-red-normal mt-4 py-2 px-4 rounded-full text-lg text-white hover:bg-dark-red-hover"
//                 onClick={checkoutHandler}
//               >
//                 {t("Proceed To Checkout")}
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Purchase;








// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useTranslation } from "react-i18next";

// const Purchase = () => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const cart = useSelector((state) => state.cart);
//   const { cartItems } = cart;

//   const checkoutHandler = () => {
//     navigate("/login?redirect=/shipping");
//   };

//   return (
//     <>
//       <div className="container mx-auto mt-[5rem]">
//         {cartItems.length === 0 ? (
//           <div>
//             {t("Your cart is empty")}{" "}
//             <Link to="/shop" className="text-dark-green-normal">
//               {t("Go To Shop")}
//             </Link>
//           </div>
//         ) : (
//           <div className="w-[80%] mx-auto">
//             <h1 className="text-2xl font-semibold mb-4">{t("Order Summary")}</h1>

//             <div className="flex flex-col w-full">
//               {cartItems.map((item) => (
//                 <div key={item._id} className="flex items-center mb-[1rem] pb-2 border-b">
//                   <div className="w-[5rem] h-[5rem]">
//                     <img
//                       src={item.images[0]}
//                       alt={item.name}
//                       className="w-full h-full object-cover rounded"
//                     />
//                   </div>

//                   <div className="flex-1 ml-4">
//                     <Link
//                       to={`/product/${item._id}`}
//                       className="text-slate-800 font-semibold"
//                     >
//                       {item.name}
//                     </Link>

//                     <div className="mt-2 text-dark-black">{item.brand}</div>
//                     <div className="mt-2 text-dark-black font-bold">
//                       ₹ {(item.actualPrice * (1 - item.discountPercentage / 100)).toFixed(2)}
//                     </div>
//                   </div>

//                   <div className="w-24">
//                     <select
//                       className="w-full p-1 border rounded text-dark-black"
//                       value={item.qty}
//                       disabled
//                     >
//                       {[...Array(item.countInStock).keys()].map((x) => (
//                         <option key={x + 1} value={x + 1}>
//                           {x + 1}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//               ))}

//               <div className="mt-8 w-full">
//                 <div className="p-4 rounded-lg border">
//                   <h2 className="text-xl font-semibold mb-2">
//                     {t("Items")} ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
//                   </h2>

//                   <div className="text-2xl font-bold">
//                     ₹{" "}
//                     {cartItems
//                       .reduce(
//                         (acc, item) =>
//                           acc +
//                           item.qty * item.actualPrice * (1 - item.discountPercentage / 100),
//                         0
//                       )
//                       .toFixed(2)}
//                   </div>

//                   <button
//                     className="bg-dark-red-normal mt-4 py-2 px-4 rounded-full text-lg text-white hover:bg-dark-red-hover"
//                     onClick={checkoutHandler}
//                   >
//                     {t("Proceed To Checkout")}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Purchase;










// import { useLocation, useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";

// const Purchase = () => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const product = location.state?.product;

//   if (!product) {
//     return (
//       <div className="container mx-auto mt-[5rem]">
//         {t("No product selected")}{" "}
//         <Link to="/shop" className="text-dark-green-normal">
//           {t("Go To Shop")}
//         </Link>
//       </div>
//     );
//   }

//   const checkoutHandler = () => {
//     navigate("/login?redirect=/shipping");
//   };

//   return (
//     <div className="container mx-auto mt-[5rem]">
//       <div className="w-[80%] mx-auto">
//         <h1 className="text-2xl font-semibold mb-4">{t("Order Summary")}</h1>
//         <div className="p-4 rounded-lg border">
//           <div className="flex items-center mb-4">
//             <img
//               src={product.images[0]}
//               alt={product.name}
//               className="w-[5rem] h-[5rem] object-cover rounded"
//             />
//             <div className="ml-4">
//               <h2 className="text-xl font-semibold">{product.name}</h2>
//               <div className="text-dark-black">{product.brand}</div>
//               <div className="text-dark-black font-bold">
//                 ₹{(product.actualPrice * (1 - product.discountPercentage / 100)).toFixed(2)}
//               </div>
//             </div>
//           </div>

//           <button
//             className="bg-dark-red-normal mt-4 py-2 px-4 rounded-full text-lg text-white hover:bg-dark-red-hover"
//             onClick={checkoutHandler}
//           >
//             {t("Proceed To Checkout")}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Purchase;



import { useLocation, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const Purchase = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container mx-auto mt-[5rem]">
        {t("No product selected")}{" "}
        <Link to="/shop" className="text-dark-green-normal">
          {t("Go To Shop")}
        </Link>
      </div>
    );
  }

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="container mx-auto mt-[5rem]">
      <div className="w-[80%] mx-auto">
        <h1 className="text-2xl font-semibold mb-4">{t("Order Summary")}</h1>
        <div className="p-4 rounded-lg border">
          <div className="flex items-center mb-4">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-[5rem] h-[5rem] object-cover rounded"
            />
            <div className="ml-4">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <div className="text-dark-black">{product.brand}</div>
              <div className="text-dark-black font-bold">
                ₹{(product.actualPrice * (1 - product.discountPercentage / 100)).toFixed(2)}
              </div>
              <div className="mt-2">
                <label htmlFor="quantity" className="block text-dark-black">
                  {t("Quantity")}
                </label>
                <select
                  id="quantity"
                  className="w-full p-1 border rounded text-dark-black"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button
            className="bg-dark-red-normal mt-4 py-2 px-4 rounded-full text-lg text-white hover:bg-dark-red-hover"
            onClick={checkoutHandler}
          >
            {t("Proceed To Checkout")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
