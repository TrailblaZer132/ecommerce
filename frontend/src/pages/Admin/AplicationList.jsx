import { useSelector } from 'react-redux';
import { useGetSellerApplicationsQuery, useToggleSellerStatusMutation } from '../../redux/api/sellerApplicationsApiSlice.js';

const AplicationList = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: sellers, error, isLoading } = useGetSellerApplicationsQuery();
  const [toggleSellerStatus] = useToggleSellerStatusMutation();

  const handleToggleSeller = async (email) => {
    try {
      await toggleSellerStatus(email).unwrap();
    } catch (err) {
      console.error('Failed to toggle seller status: ', err);
    }
  };
  

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading seller applications</div>;

  const filteredSellers = sellers.filter((seller) => seller.pincode === userInfo.pincode);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <br /><br /><br /><br /><br />
      <table className="w-full text-sm text-left rtl:text-right text-white-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Email</th>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Address</th>
            <th scope="col" className="px-6 py-3">Pincode</th>
            <th scope="col" className="px-6 py-3">Phone Number</th>
            <th scope="col" className="px-6 py-3">Company Name</th>
            <th scope="col" className="px-6 py-3">Aadhaar</th>
            <th scope="col" className="px-6 py-3">PAN</th>
            <th scope="col" className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSellers.map((seller) => (
            <tr key={seller._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {seller.email}
              </th>
              <td className="px-6 py-4">{seller.name}</td>
              <td className="px-6 py-4">{seller.address}</td>
              <td className="px-6 py-4">{seller.pincode}</td>
              <td className="px-6 py-4">{seller.phoneNumber}</td>
              <td className="px-6 py-4">{seller.companyName}</td>
              <td className="px-6 py-4">
                <a href={`/uploadsDOC/${seller.aadhaar}`} download className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Download Aadhaar</a>
              </td>
              <td className="px-6 py-4">
                <a href={`/uploadsDOC/${seller.pan}`} download className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Download PAN</a>
              </td>
              <td className="px-6 py-4">
                <button 
                  onClick={() => handleToggleSeller(seller.email)} 
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  {seller.isSeller ? 'Revoke Seller' : 'Approve Seller'}
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
