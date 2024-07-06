import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SellerRegistration = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    address: '',
    pincode: '',
    phoneNumber: '',
    companyName: '',
    aadhaar: null,
    pan: null,
  });

  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [pincodes, setPincodes] = useState([]);

  useEffect(() => {
    if (userInfo?.email) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        email: userInfo.email,
      }));
      checkIfAlreadyApplied(userInfo.email);
    }
    fetchPincodes();
  }, [userInfo]);

  const checkIfAlreadyApplied = async (email) => {
    try {
      const response = await axios.get(`/api/check-seller-registration?email=${email}`);
      if (response.data.applied) {
        setAlreadyApplied(true);
      }
    } catch (error) {
      toast.error('Error checking registration status');
    }
  };

  const fetchPincodes = async () => {
    try {
      const response = await axios.get('/api/users/pincodes');
      const pincodes = response.data;
      setPincodes(pincodes);
    } catch (error) {
      console.log(error);
      toast.error('Error fetching pincodes');
    }
  };
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await axios.post('/api/seller-registrations', data);
      toast.success('Your application was sent successfully!');
      navigate("/");
    } catch (error) {
      toast.error('Already Applied or there is something went wrong');
    }
  };
  console.log(userInfo);

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0] mt-[5rem]">
      {alreadyApplied ? (
        <div className="max-w-md mx-auto text-center">
          <p className="text-xl font-semibold">YOU HAVE ALREADY APPLIED. PLEASE WAIT FOR CONFIRMATION, THANK YOU</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto" encType="multipart/form-data">
          {/* Email */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={formData.email}
              onChange={handleChange}
              readOnly
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>
          {/* Name */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={formData.name}
              onChange={handleChange}
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Name
            </label>
          </div>
          {/* Address */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="address"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={formData.address}
              onChange={handleChange}
            />
            <label
              htmlFor="address"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Address
            </label>
          </div>
          {/* Pincode Dropdown */}
          <div className="relative z-0 w-full mb-5 group">
            <select
              name="pincode"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
              value={formData.pincode}
              onChange={handleChange}
            >
              <option value="" disabled>Select your pincode</option>
              {pincodes.map((pincode, index) => (
                <option key={index} value={pincode}>{pincode}</option>
              ))}
            </select>
            <label
              htmlFor="pincode"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Pincode
            </label>
          </div>
          {/* Phone Number */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="phoneNumber"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <label
              htmlFor="phoneNumber"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone Number
            </label>
          </div>
          {/* Company Name */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="companyName"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={formData.companyName}
              onChange={handleChange}
            />
            <label
              htmlFor="companyName"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Company Name
            </label>
          </div>
          {/* Aadhaar Upload */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="file"
              name="aadhaar"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
              onChange={handleFileChange}
            />
            <label
              htmlFor="aadhaar"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Aadhaar Upload
            </label>
          </div>
          {/* PAN Upload */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="file"
              name="pan"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
              onChange={handleFileChange}
            />
            <label
              htmlFor="pan"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              PAN Upload
            </label>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      )}
      <ToastContainer />
    </div>
  );
};

export default SellerRegistration;
