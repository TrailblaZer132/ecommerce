// frontend/src/pages/SellerDeliveryStatus.jsx
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Loader from "../components/Loader";
// import Message from "../components/Message";

// const SellerDeliveryStatus = () => {
//   const { id: orderId } = useParams();
//   const [order, setOrder] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [status, setStatus] = useState("");
//   const [deliveryAgent, setDeliveryAgent] = useState({
//     name: "",
//     contact: "",
//     estimatedDeliveryDate: "",
//   });

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const { data } = await axios.get(
//           `/api/orders/${orderId}/delivery-details`
//         );
//         setOrder(data);
//         setStatus(data.deliveryStatus);
//         setDeliveryAgent(
//           data.deliveryAgent || {
//             name: "",
//             contact: "",
//             estimatedDeliveryDate: "",
//           }
//         );
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

//   const updateDeliveryStatusHandler = async () => {
//     try {
//       const { data } = await axios.put(`/api/orders/${orderId}/delivery`, {
//         status,
//         deliveryAgent,
//       });
//       setOrder(data);
//       alert("Delivery status updated successfully");
//     } catch (error) {
//       alert(
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message
//       );
//     }
//   };

//   return loading ? (
//     <Loader />
//   ) : error ? (
//     <Message variant="danger">{error}</Message>
//   ) : (
//     <div className="container mx-auto mt-[5rem]">
//       <h1 className="text-2xl font-semibold mb-4">Update Delivery Status</h1>
//       <div className="p-4 rounded-lg border">
//         <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
//         <div className="mb-4">
//           <label className="block text-dark-gray mb-2">Delivery Status</label>
//           <select
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//             className="w-full p-2 border rounded"
//           >
//             <option value="Pending">Pending</option>
//             <option value="Shipped">Shipped</option>
//             <option value="Out for Delivery">Out for Delivery</option>
//             <option value="Delivered">Delivered</option>
//           </select>
//         </div>
//         <div className="mb-4">
//           <label className="block text-dark-gray mb-2">
//             Delivery Agent Name
//           </label>
//           <input
//             type="text"
//             value={deliveryAgent.name}
//             onChange={(e) =>
//               setDeliveryAgent({ ...deliveryAgent, name: e.target.value })
//             }
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-dark-gray mb-2">
//             Delivery Agent Contact
//           </label>
//           <input
//             type="text"
//             value={deliveryAgent.contact}
//             onChange={(e) =>
//               setDeliveryAgent({ ...deliveryAgent, contact: e.target.value })
//             }
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-dark-gray mb-2">
//             Estimated Delivery Date
//           </label>
//           <input
//             type="date"
//             value={deliveryAgent.estimatedDeliveryDate}
//             onChange={(e) =>
//               setDeliveryAgent({
//                 ...deliveryAgent,
//                 estimatedDeliveryDate: e.target.value,
//               })
//             }
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <button
//           onClick={updateDeliveryStatusHandler}
//           className="bg-dark-red-normal text-white py-2 px-4 rounded"
//         >
//           Update Status
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SellerDeliveryStatus;