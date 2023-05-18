import React, { useEffect } from "react";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import ProductCarousel from "./ProductCarousel";
import ReviewCard from "./ReviewCard.jsx";
import { useToast } from "@chakra-ui/react";
import Loader from "../layout/loader/Loader";
import Metadata from "../layout/Metadata";
import { addToCart } from "../../actions/cartActions";
const ProductDetails = () => {
  let { id } = useParams();
  const toast = useToast();
  const dispatch = useDispatch();
  const [count, setCount] = React.useState(1);
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const errorToast = (message) => {
    toast({
      title: "Request Error",
      description: message,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };
  useEffect(() => {
    if (error) {
      errorToast(error.message);

      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error]);
  const incrementCount = () => {
    if (count < product.stock) {
      setCount(count + 1);
    }
  };
  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const { name, _id, stock } = product;

  const addItemsToCartHandler = (e) => {
    dispatch(addToCart(_id, count));

    console.log("items added to cart", _id, count);
  };

  return (
    <>
      <Metadata title={`${name?.toUpperCase()}--ECOMMERCE`} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="ProductDetails">
            <div>
              <ProductCarousel data={product?.images} />
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product?.name}</h2>
                <p>id #{product?._id}</p>
              </div>
              <div className="detailsBlock-2">
                <span>{product?.numOfReviews}</span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`Rs.${product?.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decrementCount}>-</button>
                    <input
                      readOnly
                      type="text"
                      value={count}
                      name=""
                      id=""
                      style={{ color: "black" }}
                    />
                    <button onClick={incrementCount}>+</button>
                  </div>
                  <button onClick={addItemsToCartHandler}>Add To Cart</button>
                </div>
                <p>
                  Status:{" "}
                  <b className={product?.stock < 1 ? "redColor" : "greenColor"}>
                    {product?.stock < 1 ? "Out of Stock" : "In Stock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                <span>Description: {product?.description}</span>
              </div>
              <button className="submitReview">Submit Review</button>
            </div>
          </div>

          <div className="reviewsHeading">REVIEWS</div>
          {product?.reviews && product?.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((e, i) => <ReviewCard key={i} data={e} />)}
            </div>
          ) : (
            <p className="noReviews"> No Reviews Yet</p>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
