import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import signupImage from "../../components/images/signup.jpg";
import { useTranslation } from "react-i18next";
import "./register.css"; // Import the CSS file

const Register = () => {
  const { t } = useTranslation();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await register({ username, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success("Registered successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.data.message);
    }
  };

  return (
    <div className="register-section">
      <section className="register-container">
        <div className="register-form">
          <h1 className="text-2xl font-semibold mb-4">{t("Register")}</h1>

          <form
            onSubmit={submitHandler}
            className="container w-[40rem]"
            action=""
          >
            <div className="my-[2rem]">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-black"
              >
                {t("Name")}
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 p-2 border rounded w-full"
                placeholder={t("Enter your name")}
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="my-[2rem]">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black"
              >
                {t("Email address")}
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 border rounded w-full"
                placeholder={t("Enter your email address")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="my-[2rem]">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black"
              >
                {t("Password")}
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2 border rounded w-full"
                placeholder={t("Enter your password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="my-[2rem]">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-black"
              >
                {t("Confirm Password")}
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="mt-1 p-2 border rounded w-full"
                placeholder={t("Confirm Password")}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer my[1rem]"
            >
              {t(`${isLoading ? "Registering..." : "Register"}`)}
            </button>

            {isLoading && <Loader />}
          </form>

          <div className="mt-4">
            <p className="text-gray">
              {t("Already have an account")}?{" "}
              <Link
                to={redirect ? `/login?redirect=${redirect}` : `/login`}
                className="text-blue-500 hover:underline"
              >
                {t("Login")}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
