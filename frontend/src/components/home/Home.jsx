import React from "react";
import "./Home.scss";
import ProductCard from "./ProductCard.jsx";
import Metadata from "../layout/Metadata";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProducts } from "../../actions/productAction.jsx";
import Loader from "../layout/loader/Loader";
import { ChakraProvider } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import Toast from "../layout/toast/Toast.jsx";
import { useToast } from "@chakra-ui/react";
const Home = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  const errorToast = (message) => {
    toast({
      title: "Request Error",
      description: message,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };
  React.useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  React.useEffect(() => {
    if (error) {
      errorToast(error.message);
      dispatch(clearErrors());
    }
  }, [error]);
  return (
    <>
      <Metadata title={"Ecommerce"} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <ChakraProvider>
            <div className="banner">
              <p>Welcome to Ecommerce </p>
              <h1>FIND AMAZING PRODUCTS BELOW</h1>
              <a id="container">
                <button>Scroll</button>
              </a>
            </div>
            <div className="homeHeading">Featured Product</div>
            <div className="container" id="container">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          </ChakraProvider>
        </>
      )}
    </>
  );
};

export default Home;

function ToastExample() {
  const toast = useToast();
  return (
    <Button
      onClick={() =>
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      }
    >
      Show Toast
    </Button>
  );
}
