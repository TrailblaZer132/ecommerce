import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { useRegisterMutation, useVerifyOtpMutation } from "../../redux/api/usersApiSlice";
import signupImage from "../../components/images/signup.jpg";
import { useTranslation } from "react-i18next";
import "./register.css";

const Register = () => {
  const { t } = useTranslation();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const [verifyOtp, { isLoading: isOtpLoading }] = useVerifyOtpMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const res = await register({ username, email, password }).unwrap();
      setIsOtpSent(true);
      toast.success(res.message);
    } catch (err) {
      toast.error(err.data?.message || err.error);
    }
  };

  const otpSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await verifyOtp({ email, otp }).unwrap();
      toast.success(res.message);
      navigate("/login");
    } catch (err) {
      toast.error(err.data?.message || err.error);
    }
  };

  return (
    <div className="register-section">
      <div className="register-container">
        <div className="register-form">
          <h1>{t("Register")}</h1>
          {!isOtpSent ? (
            <form onSubmit={submitHandler}>
              <label htmlFor="name">{t("Name")}</label>
              <input
                type="text"
                id="name"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
              <label htmlFor="email">{t("Email Address")}</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="password">{t("Password")}</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="confirmPassword">{t("Confirm Password")}</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer my-4">
                {t(`${isLoading ? "Loading..." : "Register"}`)}
              </button>
              {isLoading && <Loader />}
            </form>
          ) : (
            <form onSubmit={otpSubmitHandler}>
              <label htmlFor="otp">{t("OTP")}</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer my-4">
                {t(`${isOtpLoading ? "Verifying..." : "Verify OTP"}`)}
              </button>
              {isOtpLoading && <Loader />}
            </form>
          )}

          <div className="pt-3">
            <h2>{t("Already have an account")}? <Link to={redirect ? `/login?redirect=${redirect}` : "/login"} className="text-red-500 underline">
              {t("Login")}
            </Link></h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;



