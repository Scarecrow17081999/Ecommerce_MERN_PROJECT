import "./App.scss";
import { useEffect } from "react";
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

import store from "./Store";
import { loadUser } from "./actions/userActions";
import { useSelector } from "react-redux";
import ForgotPassword from "./components/user/forgotPassword";

function App() {
  // const { isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Poppins:300,400,500,600,700,800,900"],
      },
    });
    store.dispatch(loadUser());
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
        <Route
          path="/password/update"
          element={<UpdatePassword props={null} />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
