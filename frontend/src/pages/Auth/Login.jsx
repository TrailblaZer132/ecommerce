import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import loginImage from "../../components/images/login.jpg";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

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

    try {
      const res = await login({ email, password }).unwrap();
      console.log(res);
      dispatch(setCredentials({ ...res }));
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <div>
      <section className="pl-[10rem] flex flex-wrap mt-[5rem]">
        <div className="mr-[4rem] mt-[5rem]">
          <h1 className="text-2xl font-semibold mb-4">{t("Login")}</h1>

          <form
            onSubmit={submitHandler}
            className="container w-[40rem]"
            action=""
          >
            <div className="my-[2rem]">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black"
              >
                {t("Email Address")}
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

            <button
              disabled={isLoading}
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
            >
              {t(`${isLoading ? "Logging in..." : "Login"}`)}
            </button>

            {isLoading && <Loader />}
          </form>

          <div className="mt-4">
            <p className="text-black">
              {t("New User")}?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : `/register`}
                className="text-green-500 hover:underline"
              >
                {t("Register")}
              </Link>
            </p>
          </div>
        </div>
        <img
          src={loginImage}
          alt="Login"
          className="h-[60rem] w-[55%] xl:block md:hidden sm:hidden rounded-lg"
        />
      </section>
    </div>
  );
};

export default Login;
