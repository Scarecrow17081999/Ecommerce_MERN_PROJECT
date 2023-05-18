import React, { useEffect } from "react";
import "./orderDetails.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../../actions/orderActions";
import Metadata from "../layout/Metadata";
import Loader from "../layout/loader/Loader";

import { Typography, colors } from "@mui/material";
const OrderDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { order, loading, error } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch]);
  console.log();

  const paymentInfo = () => {
    if (order) {
      if (order.paymentInfo) {
        if (order.paymentInfo.status == "succeeded") {
          return ["PAID", "green"];
        } else {
          return ["NOT PAID", "red"];
        }
      }
    }
  };

  return (
    <>
      <Metadata title="Order Details" />

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="orderDetailsPaf">
            <div className="orderDetailsContainer">
              <Typography component={"h1"}>
                Order #{order && order._id}
              </Typography>
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
                  <span>{order && `+91  ${order?.shippingInfo?.phoneNo}`}</span>
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
                  {/* <p style={{ color: paymentInfo()[1] }}>{paymentInfo()[0]}</p> */}
                </div>
                <div>
                  <p>Amount:</p>
                  <span>{order && `Rs. ${order?.totalPrice}`}</span>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Order Items</Typography>

              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item, i) => (
                    <div key={item._id}>
                      <img src={item.image} alt="" />

                      <Link to={`/product/${item._id}`}>{item.name}</Link>

                      <span>
                        {item.quantity} X {item.price} = Rs.
                        {item.quantity * item.price}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderDetails;
