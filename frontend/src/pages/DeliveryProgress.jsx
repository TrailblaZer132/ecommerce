// frontend/src/pages/DeliveryProgress.jsx
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Loader from "../components/Loader";
// import Message from "../components/Message";

// const DeliveryProgress = () => {
//   const { id: orderId } = useParams();
//   const [order, setOrder] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const { data } = await axios.get(
//           `/api/orders/${orderId}/delivery-details`
//         );
//         setOrder(data);
//         setLoading(false);
//       } catch (error) {
//         setError(
//           error.response && error.response.data.message
//             ? error.response.data.message
//             : error.message
//         );
//         setLoading(false);
//       }
//     };

//     fetchOrder();
//   }, [orderId]);

//   return loading ? (
//     <Loader />
//   ) : error ? (
//     <Message variant="danger">{error}</Message>
//   ) : (
//     <div className="container mx-auto mt-[5rem]">
//       <h1 className="text-2xl font-semibold mb-4">Delivery Progress</h1>
//       <div className="p-4 rounded-lg border">
//         <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
//         <p>Delivery Status: {order.deliveryStatus}</p>
//         {order.deliveryAgent && (
//           <>
//             <p>Delivery Agent: {order.deliveryAgent.name}</p>
//             <p>Contact: {order.deliveryAgent.contact}</p>
//             <p>
//               Estimated Delivery Date:{" "}
//               {new Date(
//                 order.deliveryAgent.estimatedDeliveryDate
//               ).toLocaleDateString()}
//             </p>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DeliveryProgress;