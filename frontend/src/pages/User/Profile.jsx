import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t } = useTranslation();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUserName(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 mt-[10rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">{t("Update Profile")}</h2>

          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-black mb-2">{t("Name")}</label>
              <input
                type="text"
                placeholder={t("Enter name")}
                className="form-input p-4 border rounded-sm w-full text-gray-600 font-mono"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-black mb-2">
                {t("Email Address")}
              </label>
              <input
                type="email"
                placeholder={t("Enter your email address")}
                className="form-input p-4 border rounded-sm w-full text-gray-600 font-mono"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-black mb-2">{t("Password")}</label>
              <input
                type="password"
                placeholder={t("Enter your password")}
                className="form-input p-4 border rounded-sm w-full text-gray-600 font-mono"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-black mb-2">
                {t("Confirm Password")}
              </label>
              <input
                type="password"
                placeholder={t("Confirm Password")}
                className="form-input p-4 border rounded-sm w-full text-gray-600 font-mono"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-evenly">
              <button
                type="submit"
                className="bg-lime-500 text-white py-2 px-4 rounded hover:bg-lime-600"
              >
                {t("Update")}
              </button>
              <Link
                to="/user-orders"
                className="bg-sky-500 text-white py-2 px-4 rounded hover:bg-sky-600"
              >
                {t("My Orders")}
              </Link>
            </div>
          </form>
        </div>

        {loadingUpdateProfile && <Loader />}
      </div>
    </div>
  );
};

export default Profile;
