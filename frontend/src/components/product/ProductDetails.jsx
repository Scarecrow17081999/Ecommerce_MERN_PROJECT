import React, { useEffect } from "react";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import ProductCarousel from "./ProductCarousel";
import ReviewCard from "./ReviewCard.jsx";
import { useToast } from "@chakra-ui/react";
import Loader from "../layout/loader/Loader";
import Metadata from "../layout/Metadata";
import { addToCart } from "../../actions/cartActions";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
} from "@mui/material";
const ProductDetails = () => {
  let { id } = useParams();
  const toast = useToast();
  const dispatch = useDispatch();
  const [count, setCount] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
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
    if (reviewError) {
      errorToast(error.message);
      console.log("review error happended");
      console.log(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      console.log("product reviewed successfully");

      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, success, reviewError]);
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

  // const { name, _id, stock } = product;

  const addItemsToCartHandler = (e) => {
    dispatch(addToCart(product?._id, count));
  };

  const submitReviewToggle = () => {
    setOpen(!open);
  };

  const submitReviewHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", product._id);
    console.log(product._id, rating, comment);
    dispatch(
      newReview({
        rating: Number(rating),
        comment: comment,
        productId: product._id,
      })
    );
    setOpen(false);
  };

  return (
    <>
      <Metadata title={`${product?.name?.toUpperCase()}--ECOMMERCE`} />
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
                  <button
                    disabled={product?.stock < 1 ? true : false}
                    onClick={addItemsToCartHandler}
                  >
                    Add To Cart
                  </button>
                </div>
                <p>
                  Status:{" "}
                  <b
                    style={
                      product?.stock < 1 ? { color: "red" } : { color: "green" }
                    }
                  >
                    {product?.stock < 1 ? "Out of Stock" : "In Stock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                <span>Description: {product?.description}</span>
              </div>
              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <div className="reviewsHeading">REVIEWS</div>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={Number(rating)}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                name=""
                id=""
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <DialogActions>
                <Button onClick={submitReviewToggle} color="secondary">
                  Cancel
                </Button>
                <Button onClick={submitReviewHandler} color="success">
                  Submit
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
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
