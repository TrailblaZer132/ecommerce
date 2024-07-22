import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import "./i18n.js";

//private Route
import PrivateRoute from "./components/PrivateRoute.jsx";

//auth
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import SellerRegistration from "./pages/Auth/sellerRegistration.jsx";
import AdminRegistration from "./pages/AdminRegistration.jsx";
import AdminList from "./pages/SuperAdmin/AdminList.jsx";

import Profile from "./pages/User/Profile.jsx";

import AdminRoute from "./pages/Admin/AdminRoute.jsx";
import SellerRoute from "./pages/Admin/SellerRoute.jsx";
import UserList from "./pages/Admin/UserList.jsx";
import CategoryList from "./pages/Admin/CategoryList.jsx";
import ProductList from "./pages/Admin/ProductList.jsx";
import AllProducts from "./pages/Admin/AllProducts.jsx";
import ProductUpdate from "./pages/Admin/ProductUpdate.jsx";
import Home from "./pages/Home.jsx";
import Favorites from "./pages/Products/Favorites.jsx";
import ProductDetails from "./pages/Products/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Shop from "./pages/Shop.jsx";
import Shipping from "./pages/Orders/Shipping.jsx";
import PlaceOrder from "./pages/Orders/PlaceOrder.jsx";
import Order from "./pages/Orders/Order.jsx";
import UserOrder from "./pages/User/UserOrder.jsx";
import OrderList from "./pages/Admin/OrderList.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import ContactUs from "./pages/ContactUs.jsx";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import AboutUs from "./pages/AboutUs.jsx";
import MeghalayaStories from "./pages/MeghalayaStories.jsx";
import Payments from "./pages/Payments.jsx";
import ShippingFooter from "./pages/ShippingFooter.jsx";
import FAQ from "./pages/FAQ.jsx";
import CancellationReturn from "./pages/CancellationReturn.jsx";
import TermsOfUse from "./pages/TermsOfUse.jsx";
import Security from "./pages/Security.jsx";  
import Grievance from "./pages/Grievance.jsx";
import AplicationList from "./pages/Admin/AplicationList.jsx";
import Purchase from "./pages/Purchase.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/sellerRegistration" element={<SellerRegistration />} />
      <Route path="/adminRegistration" element={<AdminRegistration />} />

      <Route path="/adminList" element={<AdminList />} />

      <Route index={true} path="/" element={<Home />} />

      <Route path="/favorite" element={<Favorites />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/user-orders" element={<UserOrder />} />
      <Route path="/purchase" element={<Purchase />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/meghalaya-stories" element={<MeghalayaStories />} />
      <Route path="/payments" element={<Payments />} />
      <Route path="/shipping-footer" element={<ShippingFooter />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/cancellation&return" element={<CancellationReturn />} />
      <Route path="/termsOfUse" element={<TermsOfUse />} />
      <Route path="/security" element={<Security />} />
      <Route path="/grievance-redressal" element={<Grievance />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/order/:id" element={<Order />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="userlist" element={<UserList />} />
        <Route path="categorylist" element={<CategoryList />} />
        <Route path="productlist" element={<ProductList />} />
        <Route path="allproductslist" element={<AllProducts />} />
        <Route path="orderlist" element={<OrderList />} />
        <Route path="Aplicationlist" element={<AplicationList />} />
        <Route path="product/update/:_id" element={<ProductUpdate />} />
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>

      <Route path="/seller" element={<SellerRoute />}>
        <Route path="productlist" element={<ProductList />} />
        <Route path="orderlist" element={<OrderList />} />
        <Route path="allproductslist" element={<AllProducts />} />
        <Route path="product/update/:_id" element={<ProductUpdate />} />
        
      </Route>
    </Route>

   
    

  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PayPalScriptProvider>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  </Provider>
);
