import "./App.scss";
import { useEffect, useState } from "react";
import Header from "./components/layout/header/Header.jsx";
import Footer from "./components/layout/footer/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import WebFont from "webfontloader";
import ProductDetails from "./components/product/ProductDetails.jsx";
import UpdateProfile from "./components/user/UpdateProfile.jsx";
import UpdatePassword from "./components/user/UpdatePassword.jsx";
import Products from "./components/product/Products.jsx";
import Search from "./components/product/Search.jsx";
import LoginSignUp from "./components/user/LoginSignUp.jsx";
import Profile from "./components/user/Profile.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Shipping from "./components/Cart/Shipping.jsx";
import MyOrders from "./components/Orders/MyOrders.jsx";
import OrderDetails from "./components/Orders/OrderDetails.jsx";
import store from "./Store";
import { loadUser } from "./actions/userActions";
import ForgotPassword from "./components/user/forgotPassword";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Payment from "./components/Cart/payment";
import axios from "axios";
import OrderSuccess from "./components/Cart/OrderSuccess";
import Dashboard from "./components/admin/Dashboard.jsx";
import ProductList from "./components/admin/ProductList.jsx";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct.jsx";
import OrderList from "./components/admin/OrderList.jsx";
import ProcessOrder from "./components/admin/ProcessOrder.jsx";
import UsersList from "./components/admin/UsersList.jsx";
import UpdateUser from "./components/admin/UpdateUser.jsx";
import ProductReviews from "./components/admin/ProductReviews.jsx";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Poppins:300,400,500,600,700,800,900"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/products/:name" element={<Products />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/me/update" element={<UpdateProfile />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/order/confirm" element={<ConfirmOrder />} />
        <Route path="/success" element={<OrderSuccess />} />
        <Route path="/order/me" element={<MyOrders />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route
          path="/password/update"
          element={<UpdatePassword props={null} />}
        />
        <Route path="/payment" element={<Payment stripeKey={stripeApiKey} />} />
        {/* //ADMIN ROUTES// */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products" element={<ProductList />} />
        <Route path="/admin/product" element={<NewProduct />} />
        <Route exact path="/admin/product/:id" element={<UpdateProduct />} />
        <Route exact path="/admin/orders" element={<OrderList />} />
        <Route exact path="/admin/orders/:id" element={<ProcessOrder />} />
        <Route exact path="/admin/users" element={<UsersList />} />
        <Route exact path="/admin/user/:id" element={<UpdateUser />} />
        <Route exact path="/admin/reviews" element={<ProductReviews />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
