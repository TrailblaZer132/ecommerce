import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useTranslation } from 'react-i18next';
// import LanguageDropdown from './components/LanguageDropdown';
import "./i18n";

const App = () => {
  // const { t } = useTranslation();
  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className="py-3">
        <Outlet />

        {/* <center>
          <LanguageDropdown />
           <div>
            <h1>{t("welcomeMessage")}</h1>
            <h2>{t("greeting")}</h2>
          </div> 
        </center> */}
      </main>
    </>
  );
};

export default App;
