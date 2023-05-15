import React, { useEffect } from "react";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import ProductCarousel from "./ProductCarousel";
import ReviewCard from "./ReviewCard.jsx";
import { useToast } from "@chakra-ui/react";
import Metadata from "../layout/Metadata";
const ProductDetails = () => {
  let { id } = useParams();
  const toast = useToast();
  const dispatch = useDispatch();
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
  const name = product.name;
  return (
    <>
      <Metadata title={`${name?.toUpperCase()}--ECOMMERCE`} />
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
                <button>-</button>
                <input type="number" value="1" name="" id="" />
                <button>+</button>
              </div>
              <button>Add To Cart</button>
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
  );
};

export default ProductDetails;
