import { useSelector } from 'react-redux';
import { useGetSellerApplicationsQuery, useToggleSellerStatusMutation, useAcceptSellerMutation } from '../../redux/api/sellerApplicationsApiSlice.js';

const AplicationList = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: sellers, error, isLoading, refetch } = useGetSellerApplicationsQuery();
  const [toggleSellerStatus] = useToggleSellerStatusMutation();
  const [acceptSeller] = useAcceptSellerMutation();

  // const handleToggleSeller = async (email) => {
  //   try {
  //     await toggleSellerStatus(email).unwrap();
  //   } catch (err) {
  //     console.error('Failed to toggle seller status: ', err);
  //   }
  // };

  // const handleAcceptSeller = async (userId) => {
  //   try {
  //     const result = await acceptSeller(userId).unwrap();
  //     console.log("Accepted Seller Info:", result);
  //   } catch (err) {
  //     console.error("Failed to accept seller: ", err);
  //   }
  // };

  const handleToggleAndAcceptSeller = async (email, userId) => {
    try {
      await toggleSellerStatus(email).unwrap();
      await acceptSeller(userId).unwrap();
      console.log("Toggled Seller Status:" + userInfo.isSeller);
      console.log("Accepted Seller Info:" + userId);
      refetch();
    } catch (err) {
      console.error("Failed to toggle and accept seller: ", err);
    }
  };
  

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading seller applications</div>;

  const filteredSellers = sellers.filter((seller) => seller.pincode === userInfo.pincode);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <br />
      <br />
      <br />
      <br />
      <br />
      <table className="w-full text-sm text-left rtl:text-right text-dark-gray dark:text-dark-gray">
        <thead className="text-xs text-light-white uppercase bg-white dark:bg-dark-gray dark:text-light-white">
          <tr>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Address
            </th>
            <th scope="col" className="px-6 py-3">
              Pincode
            </th>
            <th scope="col" className="px-6 py-3">
              Phone Number
            </th>
            <th scope="col" className="px-6 py-3">
              Company Name
            </th>
            <th scope="col" className="px-6 py-3">
              Aadhaar
            </th>
            <th scope="col" className="px-6 py-3">
              PAN
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredSellers.map((seller) => (
            <tr
              key={seller._id}
              className="odd:bg-white even:dark:bg-light-red even:bg-light-gray odd:dark:bg-light-lightRed border-b dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-dark-black whitespace-nowrap dark:text-dark-gray"
              >
                {seller.email}
              </th>
              <td className="px-6 py-4">{seller.name}</td>
              <td className="px-6 py-4">{seller.address}</td>
              <td className="px-6 py-4">{seller.pincode}</td>
              <td className="px-6 py-4">{seller.phoneNumber}</td>
              <td className="px-6 py-4">{seller.companyName}</td>
              <td className="px-6 py-4">
                <a
                  href={`/uploadsDOC/${seller.aadhaar}`}
                  download
                  className="font-medium text-dark-gray  hover:underline"
                >
                  Download Aadhaar
                </a>
              </td>
              <td className="px-6 py-4">
                <a
                  href={`/uploadsDOC/${seller.pan}`}
                  download
                  className="font-medium text-dark-gray hover:underline"
                >
                  Download PAN
                </a>
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() =>
                    handleToggleAndAcceptSeller(seller.email, seller._id)
                  }
                  className="font-medium text-dark-gray hover:underline"
                >
                  {seller.isSeller ? "Revoke Seller" : "Approve Seller"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AplicationList;
