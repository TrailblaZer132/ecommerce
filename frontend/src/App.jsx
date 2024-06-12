import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import Footer from "./pages/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useTranslation } from 'react-i18next';
// import LanguageDropdown from './components/LanguageDropdown';
// import Navbar from "./pages/Navbar";
import "./i18n";

const App = () => {
  return (
    <div
      className="app-container"
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <ToastContainer zIndex={9999} />
      <Navigation />

      <main className="py-3" style={{ flex: "1 0 auto" }}>
        <Outlet />
      </main>

      <Footer style={{ flexShrink: "0"}} />
    </div>
  );
};

export default App;
