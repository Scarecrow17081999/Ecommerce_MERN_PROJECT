import React, { useEffect, useState } from "react";
import "./productReviews.css";
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from "./Sidebar.jsx";
import { useSelector, useDispatch } from "react-redux";
import { getAllReview, deleteReview } from "../../actions/productAction";
import StarRateIcon from "@mui/icons-material/StarRate";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Metadata from "../layout/Metadata";
import Loader from "../layout/loader/Loader";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";
import { clearErrors } from "../../actions/productAction";
const ProductReviews = () => {
  const dispatch = useDispatch();
  const [productId, setProductId] = useState("");
  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );
  const {
    isDeleted,
    error: deletedError,
    loading: deleteLoading,
  } = useSelector((state) => state.deleteReview);

  console.log(reviews);

  const deleteReviewsHandler = (id) => {
    dispatch(deleteReview(productId, id));
  };

  useEffect(() => {
    if (productId.length == 24) {
      dispatch(getAllReview(productId));
    }

    if (deletedError) {
      console.log("review deletion unsuccessful");
      dispatch(clearErrors());
    }

    if (isDeleted) {
      console.log("review deleted successfully");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [isDeleted, deletedError, productId]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },
    {
      field: "comment",
      headerName: "Comment",
      type: "number",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,
      cellClassName: (params) => {
        if (params.row.rating >= 3) {
          return "greenColor";
        } else {
          return "redColor";
        }
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      minWidth: 150,
      flex: 0.5,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() => {
                deleteReviewsHandler(params.id);
              }}
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const productReviewSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(getAllReview(productId));
  };

  const rows = [];
  reviews &&
    reviews?.forEach((element) => {
      rows.push({
        id: element._id,
        rating: element.rating,
        comment: element.comment,
        name: `${element.name}`,
      });
    });

  return (
    <>
      <Metadata title="ALL REVIEWS Admin" />
      {loading ? (
        <Loader />
      ) : (
        <div className="dashboard">
          <Sidebar />
          <div className="productReviewsContainer">
            <form
              onSubmit={productReviewSubmitHandler}
              className="productReviewsForm"
              encType="multipart/form-data"
            >
              <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

              <div>
                <StarRateIcon />

                <input
                  type="text"
                  required
                  placeholder="Product ID"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                />
              </div>
              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  deleteLoading
                    ? true
                    : false || productId == ""
                    ? true
                    : false || loading
                    ? true
                    : false
                }
              >
                Get Reviews
              </Button>
            </form>
            {reviews && reviews.length > 0 ? (
              <DataGrid
                rows={rows}
                columns={columns}
                disableRowSelectionOnClick
              />
            ) : (
              <h1 className="productReviewsFormHeading">NO REVIEWS FOUND</h1>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductReviews;
