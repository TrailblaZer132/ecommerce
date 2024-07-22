// import React, { useEffect, useState } from "react";
// import Message from "../../components/Message";
// import Loader from "../../components/Loader";
// import { Link } from "react-router-dom";
// import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";
// import easyinvoice from "easyinvoice";
// import axios from "axios";

// const UserOrder = () => {
//   const { data: orders, isLoading, error } = useGetMyOrdersQuery();
//   const [orderDetails, setOrderDetails] = useState(null);
//   const [sellerDetails, setSellerDetails] = useState(null);
//   const [loadingDetails, setLoadingDetails] = useState(false);
//   const [detailsError, setDetailsError] = useState(null);

//   useEffect(() => {
//     if (orderDetails && sellerDetails) {
//       generateInvoice(orderDetails, sellerDetails);
//     }
//   }, [orderDetails, sellerDetails]);

//   const fetchOrderDetails = async (id) => {
//     try {
//       setLoadingDetails(true);
//       const { data: orderData } = await axios.get(`/api/orders/${id}`);
//       setOrderDetails(orderData);

//       if (!orderData.orderItems || orderData.orderItems.length === 0 || !orderData.orderItems[0].sellerId) {
//         throw new Error("Seller ID not found in order data");
//       }
      
//       const sellerUserId = orderData.orderItems[0].sellerId;
//       const { data: sellerData } = await axios.get(`/api/seller-registrations/user/${sellerUserId}`);
//       setSellerDetails(sellerData);

//       setLoadingDetails(false);
//     } catch (error) {
//       console.error("Error fetching order details:", error.message);
//       setDetailsError(error.message);
//       setLoadingDetails(false);
//     }
//   };

//   const generateInvoice = async (order, seller) => {
//     const data = {
//       documentTitle: "Meghali",
//       currency: "INR",
//       taxNotation: "GST",
//       marginTop: 25,
//       marginRight: 25,
//       marginLeft: 25,
//       marginBottom: 25,
//       sender: {
//         company: seller.companyName || "N/A",
//         address: seller.address || "N/A",
//         zip: seller.pincode || "N/A",
//         city: "Guwahati", // Assuming city is not directly available in seller details
//         country: "India" // Assuming country is not directly available in seller details
//       },
//       client: {
//         company: order.user.username || "N/A",
//         address: order.shippingAddress?.address || "N/A",
//         zip: order.shippingAddress?.postalCode || "N/A",
//         city: order.shippingAddress?.city || "N/A",
//         country: order.shippingAddress?.country || "N/A"
//       },
//       invoiceNumber: order._id,
//       invoiceDate: order.createdAt.substring(0, 10),
//       products: order.orderItems.map(item => ({
//         quantity: item.qty,
//         description: item.name,
//         price: item.price
//       })),
//       bottomNotice: "Thank you for your business."
//     };
//     try{

//       const result = await easyinvoice.createInvoice(data);
//       easyinvoice.download(`${order._id}.pdf`, result.pdf);
//     }catch (error) {
//       if (error.response && error.response.status === 429) {
//         console.log('Rate limit hit, retrying after 1 minute...');
//         setTimeout(async () => {
//           try {
//             const result = await easyinvoice.createInvoice(data);
//             easyinvoice.download(`${order._id}.pdf`, result.pdf);
//           } catch (retryError) {
//             console.error('Failed on retry:', retryError);
//           }
//         }, 60000); // Retry after 1 minute
//       } else {
//         console.error('Failed to generate invoice:', error);
//       }
//     }
//   };

//   return (
//     <div className="container mx-auto mt-[5rem]">
//       <h2 className="text-2xl font-semibold mb-4">My Orders</h2>

//       {isLoading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="danger">{error?.data?.error || error.error}</Message>
//       ) : (
//         <table className="w-full">
//           <thead>
//             <tr>
//               <td className="py-2">IMAGE</td>
//               <td className="py-2">ID</td>
//               <td className="py-2">DATE</td>
//               <td className="py-2">TOTAL</td>
//               <td className="py-2">PAID</td>
//               <td className="py-2">DELIVERED</td>
//               <td className="py-2">INVOICE</td>
//               <td className="py-2"></td>
//             </tr>
//           </thead>

//           <tbody>
//             {orders.map((order) => (
//               <tr key={order._id}>
//                 <td>
//                   <img
//                     src={order.orderItems[0].image}
//                     alt={order.user}
//                     className="w-[6rem] mb-5"
//                   />
//                 </td>
//                 <td className="py-2">{order._id}</td>
//                 <td className="py-2">{order.createdAt.substring(0, 10)}</td>
//                 <td className="py-2">$ {order.totalPrice}</td>

//                 <td className="py-2">
//                   {order.isPaid ? (
//                     <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
//                       Completed
//                     </p>
//                   ) : (
//                     <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
//                       Pending
//                     </p>
//                   )}
//                 </td>

//                 <td className="px-2 py-2">
//                   {order.isDelivered ? (
//                     <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
//                       Completed
//                     </p>
//                   ) : (
//                     <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
//                       Pending
//                     </p>
//                   )}
//                 </td>

//                 <td className="px-2 py-2">
//                   {loadingDetails ? (
//                     <Loader />
//                   ) : detailsError ? (
//                     <Message variant="danger">{detailsError}</Message>
//                   ) : (
//                     <button
//                       onClick={() => fetchOrderDetails(order._id)}
//                       className="bg-green-400 text-black py-2 px-3 rounded"
//                     >
//                       Download Invoice
//                     </button>
//                   )}
//                 </td>

//                 <td className="px-2 py-2">
//                   <Link to={`/order/${order._id}`}>
//                     <button className="bg-green-400 text-back py-2 px-3 rounded">
//                       View Details
//                     </button>
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default UserOrder;








import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";
import axios from "axios";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

const UserOrder = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();
  const [orderDetails, setOrderDetails] = useState(null);
  const [sellerDetails, setSellerDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [detailsError, setDetailsError] = useState(null);
  console.log(orderDetails);
  useEffect(() => {
    if (orderDetails && sellerDetails) {
      generateInvoice(orderDetails, sellerDetails);
    }
  }, [orderDetails, sellerDetails]);
  const splitText = (text, wordCount) => {
    const words = text.split(' ');
    let lines = [];
    for (let i = 0; i < words.length; i += wordCount) {
      lines.push(words.slice(i, i + wordCount).join(' '));
    }
    return lines;
  };
  const fetchOrderDetails = async (id) => {
    try {
      setLoadingDetails(true);
      const { data: orderData } = await axios.get(`/api/orders/${id}`);
      setOrderDetails(orderData);

      if (!orderData.orderItems || orderData.orderItems.length === 0 || !orderData.orderItems[0].sellerId) {
        throw new Error("Seller ID not found in order data");
      }

      const sellerUserId = orderData.orderItems[0].sellerId;
      const { data: sellerData } = await axios.get(`/api/seller-registrations/user/${sellerUserId}`);
      setSellerDetails(sellerData);

      setLoadingDetails(false);
    } catch (error) {
      console.error("Error fetching order details:", error.message);
      setDetailsError(error.message);
      setLoadingDetails(false);
    }
  };
  const generateInvoice = (order, seller) => {
    const doc = new jsPDF();
  
    doc.setFontSize(18);
    doc.text("INVOICE", 105, 20, null, null, "center");
    doc.setFontSize(14);
    doc.text("Meghali", 105, 30, null, null, "center");
  
    doc.setFontSize(12);
    doc.text(`Invoice Number: ${order._id}`, 14, 50);
    doc.text(`Invoice Date: ${order.createdAt.substring(0, 10)}`, 14, 60);
  
    doc.setFontSize(12);
    doc.text("Seller:", 14, 80);
    doc.setFontSize(10);
    doc.text(`Company: ${seller.companyName || "N/A"}`, 14, 90);
    
    const addressLines = splitText(seller.address || "N/A", 4);
    let addressY = 100;
    addressLines.forEach(line => {
      doc.text(line, 14, addressY);
      addressY += 10;
    });
  
    doc.text(`Pincode: ${seller.pincode || "N/A"}`, 14, addressY);
    addressY += 10;
    doc.text("City: Guwahati", 14, addressY);
    addressY += 10;
    doc.text("Country: India", 14, addressY);
  
    doc.setFontSize(12);
    doc.text("Recipient:", 105, 80);
    doc.setFontSize(10);
    doc.text(`Name: ${order.user.username || "N/A"}`, 105, 90);
    doc.text(`Address: ${order.shippingAddress?.address || "N/A"}`, 105, 100);
    doc.text(`Pincode: ${order.shippingAddress?.postalCode || "N/A"}`, 105, 110);
    doc.text(`City: ${order.shippingAddress?.city || "N/A"}`, 105, 120);
    doc.text(`Country: ${order.shippingAddress?.country || "N/A"}`, 105, 130);
  
    const tableColumn = ["Quantity", "Description", "Price", "Tax"];
    const tableRows = [];
    
    
    
    order.orderItems.forEach(item => {
      const orderData = [
        item.qty,
        item.name,
        `${item.price.toFixed(2)}`,
        order.taxPrice
      ];
      tableRows.push(orderData);
    });
  
    autoTable(doc, {
      startY: 150,
      head: [tableColumn],
      body: tableRows,
      theme: 'grid',
      headStyles: { fillColor: [22, 160, 133] },
      styles: { cellPadding: 2, fontSize: 10 },
    });
  
    doc.setFontSize(12);
    doc.text(`Total: ${order.totalPrice.toFixed(2)}`, 14, doc.autoTable.previous.finalY + 10, "left");
  
    doc.setFontSize(12);
    doc.text("Thank you for your business.", 105, doc.autoTable.previous.finalY + 30, null, null, "center");
  
    doc.save(`${order._id}.pdf`);
  };
  // const generateInvoice = (order, seller) => {
  //   const doc = new jsPDF();

  
  //   doc.setFontSize(18);
  //   doc.text("INVOICE", 105, 20, null, null, "center");
  //   doc.setFontSize(14);
  //   doc.text("Meghali", 105, 30, null, null, "center");

 
  //   doc.setFontSize(12);
  //   doc.text(`Invoice Number: ${order._id}`, 14, 50);
  //   doc.text(`Invoice Date: ${order.createdAt.substring(0, 10)}`, 14, 60);


  //   doc.setFontSize(12);
  //   doc.text("Seller:", 14, 80);
  //   doc.setFontSize(10);
  //   doc.text(`Company: ${seller.companyName || "N/A"}`, 14, 90);
  //   doc.text(`Address: ${seller.address || "N/A"}`, 14, 100);
  //   doc.text(`Pincode: ${seller.pincode || "N/A"}`, 14, 110);
  //   doc.text("City: Guwahati", 14, 120);
  //   doc.text("Country: India", 14, 130);

  
  //   doc.setFontSize(12);
  //   doc.text("Recipient:", 105, 80);
  //   doc.setFontSize(10);
  //   doc.text(`Company: ${order.user.username || "N/A"}`, 105, 90);
  //   doc.text(`Address: ${order.shippingAddress?.address || "N/A"}`, 105, 100);
  //   doc.text(`Pincode: ${order.shippingAddress?.postalCode || "N/A"}`, 105, 110);
  //   doc.text(`City: ${order.shippingAddress?.city || "N/A"}`, 105, 120);
  //   doc.text(`Country: ${order.shippingAddress?.country || "N/A"}`, 105, 130);

  
  //   const tableColumn = ["Quantity", "Description", "Price","Tax"];
  //   const tableRows = [];

  //   order.orderItems.forEach(item => {
  //     const orderData = [
  //       item.qty,
  //       item.name,
  //       `${item.price.toFixed(2)}`,
  //       order.taxPrice
  //     ];
  //     tableRows.push(orderData);
  //   });

  //   autoTable(doc, {
  //     startY: 150,
  //     head: [tableColumn],
  //     body: tableRows,
  //     theme: 'grid',
  //     headStyles: { fillColor: [22, 160, 133] },
  //     styles: { cellPadding: 2, fontSize: 10 },
  //   });

   
  //   doc.setFontSize(12);
  //   doc.text(`Total: ${order.totalPrice.toFixed(2)}`, 14, doc.autoTable.previous.finalY + 10, "left");

   
  //   doc.setFontSize(12);
  //   doc.text("Thank you for your business.", 105, doc.autoTable.previous.finalY + 30, null, null, "center");

  
  //   doc.save(`${order._id}.pdf`);
  // };

 

  return (
    <div className="container mx-auto mt-[5rem]">
      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.error || error.error}</Message>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <td className="py-2">IMAGE</td>
              <td className="py-2">ID</td>
              <td className="py-2">DATE</td>
              <td className="py-2">TOTAL</td>
              <td className="py-2">PAID</td>
              <td className="py-2">DELIVERED</td>
              <td className="py-2">INVOICE</td>
              <td className="py-2"></td>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  <img
                    src={order.orderItems[0].image}
                    alt={order.user}
                    className="w-[6rem] mb-5"
                  />
                </td>
                <td className="py-2">{order._id}</td>
                <td className="py-2">{order.createdAt.substring(0, 10)}</td>
                <td className="py-2">₹{order.totalPrice.toFixed(2)}</td>

                <td className="py-2">
                  {order.isPaid ? (
                    <p className="p-1 text-center bg-red-300 w-[6rem] rounded-full">
                      Completed
                    </p>
                  ) : (
                    <p className="p-1 text-center bg-red-300 w-[6rem] rounded-full">
                      Pending
                    </p>
                  )}
                </td>

                <td className="px-2 py-2">
                  {order.isDelivered ? (
                    <p className="p-1 text-center bg-red-300 w-[6rem] rounded-full">
                      Completed
                    </p>
                  ) : (
                    <p className="p-1 text-center bg-red-300 w-[6rem] rounded-full">
                      Pending
                    </p>
                  )}
                </td>

                <td className="px-2 py-2">
                  {loadingDetails ? (
                    <Loader />
                  ) : detailsError ? (
                    <Message variant="danger">{detailsError}</Message>
                  ) : (
                    <button
                      onClick={() => fetchOrderDetails(order._id)}
                      className="bg-red-400 text-black py-2 px-3 rounded"
                    >
                      Download Invoice
                    </button>
                  )}
                </td>

                <td className="px-2 py-2">
                  <Link to={`/order/${order._id}`}>
                    <button className="bg-red-400 text-back py-2 px-3 rounded">
                      View Details
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserOrder;
