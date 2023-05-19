import React, { useEffect, useState } from "react";
import "./processOrder.css";
import { useDispatch, useSelector } from "react-redux";
import Metadata from "../layout/Metadata";
import { Button, Typography } from "@mui/material";
import Sidebar from "./Sidebar.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/orderActions";
import Loader from "../layout/loader/Loader";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import {
  CLEAR_ERRORS,
  UPDATE_ORDER_RESET,
} from "../../constants/orderConstants";
const ProcessOrder = () => {
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { isUpdated, error: updateError } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {
    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      console.log("order status updated successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    if (updateError) {
      console.log(error);
      dispatch(clearErrors());
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, error, id, isUpdated, updateError]);

  const updateOrderStatusHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("status", status);
    dispatch(updateOrder(id, myForm));
  };
  return (
    <>
      <Metadata title="Create New Product" />
      {loading ? (
        <Loader />
      ) : (
        <div className="dashboard">
          <Sidebar />
          <div className="newProductContainer">
            <>
              <div
                style={
                  order?.orderStatus == "Delivered"
                    ? { display: "block" }
                    : { display: "grid" }
                }
                className="confirmOrderPage"
              >
                <div>
                  <div className="confirmshippingArea">
                    <Typography>Shipping Info</Typography>
                    <div className="orderDetailsContainerBox">
                      <div>
                        <p>Name:</p>
                        <span>{order && order?.user?.name}</span>
                      </div>
                      <div>
                        <p>Email:</p>
                        <span>{order && order?.user?.email}</span>
                      </div>
                      <div>
                        <p>Phone:</p>
                        <span>
                          {order && `+91  ${order?.shippingInfo?.phoneNo}`}
                        </span>
                      </div>
                      <div>
                        <p>Address:</p>
                        <span>
                          {order &&
                            `${order?.shippingInfo?.city}, ${order?.shippingInfo?.state}, ${order?.shippingInfo?.country}, ${order?.shippingInfo?.pincode}`}
                        </span>
                      </div>
                    </div>

                    <Typography>Payment</Typography>
                    <div className="orderDetailsContainerBox">
                      <div>
                        <p style={{ color: "red" }}>Pending</p>
                      </div>
                      <div>
                        <p>Amount:</p>
                        <span>{order && `Rs. ${order?.totalPrice}`}</span>
                      </div>
                    </div>

                    <Typography>Order Status</Typography>

                    <div className="orderDetailsContainerBox">
                      <div>
                        {/* <p style={{ color: paymentInfo()[1] }}>{paymentInfo()[0]}</p> */}
                      </div>
                      <div>
                        <p>Status:</p>
                        <span
                          style={
                            order?.orderStatus == "Delivered"
                              ? { color: "green" }
                              : { color: "red" }
                          }
                        >
                          {order && `${order?.orderStatus}`}
                        </span>
                      </div>
                    </div>

                    <div className="confirmCartItems">
                      <Typography>Your Cart Items:</Typography>

                      <div className="confirmCartItemsContainer">
                        {order?.orderItems &&
                          order?.orderItems?.map((item) => (
                            <div key={item.id}>
                              <img src={item.image} alt={item.name} />
                              <Link to={`/product/${item.id}`}>
                                {item.name}
                              </Link>

                              <span>
                                {item.quantity} X Rs {item.price} ={" "}
                                <b>{item.quantity * item.price}</b>
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={
                    order?.orderStatus == "Delivered"
                      ? { display: "none" }
                      : { display: "block" }
                  }
                >
                  <form
                    onSubmit={updateOrderStatusHandler}
                    className="createProductForm"
                    encType="multipart/form-data"
                  >
                    <h1>Process Order</h1>

                    <div>
                      <AccountTreeIcon />
                      <select
                        value={status}
                        required
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="">Select Category</option>

                        {order?.orderStatus == "Processing" && (
                          <option value="Shipped">Shipped</option>
                        )}
                        {order?.orderStatus == "Shipped" && (
                          <option value="Delivered">Delivered</option>
                        )}
                      </select>
                    </div>
                    <Button
                      id="createProductBtn"
                      type="submit"
                      disabled={
                        loading ? true : false || status === "" ? true : false
                      }
                    >
                      Create
                    </Button>
                  </form>
                </div>
              </div>
            </>
          </div>
        </div>
      )}
    </>
  );
};

export default ProcessOrder;
