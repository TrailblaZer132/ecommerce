import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer
      className="bg-light-white dark:bg-dark-gray z-10"
      style={{ position: "static", bottom: 0, width: "100%" }}
    >
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-4 gap-8 px-4 py-6 lg:py-8 md:grid-cols-6">
          <div>
            <h2 className="mb-6 text-sm font-semibold text-dark-gray uppercase dark:text-light-white">
              {t("ABOUT")}
            </h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium text-xs">
              <li className="mb-4">
                <Link to="/contact-us" className="hover:underline">
                  {t("Contact Us")}
                </Link>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  <Link to="/about-us" className="hover:underline">
                    {t("About Us")}
                  </Link>
                </a>
              </li>
              <li className="mb-4">
                <Link to="/meghalaya-stories" className="hover:underline">
                  {t("Meghalaya stories")}
                </Link>
              </li>
              {/* <li className="mb-4">
                <Link to="/corporate-information" className="hover:underline">
                  Corporate Information
                </Link>
              </li> */}
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-dark-gray uppercase dark:text-light-white">
              {t("HELP CENTER")}
            </h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium text-xs">
              <li className="mb-4">
                <li className="mb-4">
                  <Link to="/payments" className="hover:underline">
                    {t("Payments")}
                  </Link>
                </li>
              </li>
              <li className="mb-4">
                <Link to="/shipping-footer" className="hover:underline">
                  {t("Shipping")}
                </Link>
              </li>
              <li className="mb-4">
                <Link to="/faq" className="hover:underline">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-dark-gray uppercase dark:text-light-white">
              {t("CONSUMER POLICY")}
            </h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium text-xs">
              <li className="mb-4">
                <Link to="/cancellation&return" className="hover:underline">
                  {t("Cancellation & Returns")}
                </Link>
              </li>
              <li className="mb-4">
                <Link to="/termsOfUse" className="hover:underline">
                  {t("Terms of Use")}
                </Link>
              </li>
              <li className="mb-4">
                <Link to="/security" className="hover:underline">
                  {t("Security")}
                </Link>
              </li>
              <li className="mb-4">
                <Link to="/grievance-redressal" className="hover:underline">
                  {t("Grievance Redressal")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-dark-gray uppercase dark:text-light-white">
              {t("RELATED SITES")}
            </h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium text-xs">
              <li className="mb-4">
                <a
                  href="https://www.meghalaya.gov.in/"
                  target="_blank"
                  className="hover:underline"
                >
                  {t("Government of Meghalaya")}
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="https://www.nlumeg.ac.in/"
                  target="_blank"
                  className="hover:underline"
                >
                  {t("NLU Meghalaya")}
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="https://www.iitbhilai.ac.in/"
                  target="_blank"
                  className="hover:underline"
                >
                  {t("IIT Bhilai")}
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="https://www.iiitg.ac.in/"
                  target="_blank"
                  className="hover:underline"
                >
                  {t("IIIT Guwahati")}
                </a>
              </li>
            </ul>
          </div>
          <div
            style={{
              borderLeft: "1px solid gray",
              height: "200px",
              margin: "0 20px",
            }}
          ></div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-dark-gray uppercase dark:text-light-white">
              {t("NLU MEGHALAYA ADDRESS")}
            </h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium text-xs">
              <li className="mb-4">
                {t(
                  `National Law University Meghalaya, Jingkieng, Nongthymmai, Umsawli, Shillong, Meghalaya 793018`
                )}
              </li>
            </ul>

            <div className="flex flex-col items-start">
              <h2 className="mb-6 text-sm font-semibold text-dark-gray uppercase dark:text-light-white">
                {t("SOCIAL")}
              </h2>

              <div className="flex mt-4 mr-5 space-x-5 rtl:space-x-reverse sm:justify-center md:mt-0">
                <a
                  href="#"
                  className="text-light-white hover:text-dark-gray dark:hover:text-dark-red-normal"
                >
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 8 19"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">{t("Facebook page")}</span>
                </a>

                <a
                  href="#"
                  className="text-light-white hover:text-dark-gray dark:hover:text-dark-red-normal [&>svg]:h-5 [&>svg]:w-5"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fillRule="evenodd"
                      d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>

                <a
                  href="#"
                  className="text-light-white hover:text-dark-gray dark:hover:text-dark-red-normal [&>svg]:h-5 [&>svg]:w-5"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fillRule="evenodd"
                      d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <div className="px-4 py-3 border-t bg-light-gray dark:bg-dark-gray md:flex md:items-center md:justify-between">
          <span className="text-sm text-light-white dark:text-light-white sm:text-center ml-5">
            © 2023{" "}
            <a href="#" className="hover:underline">
              E-Meghalaya
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
