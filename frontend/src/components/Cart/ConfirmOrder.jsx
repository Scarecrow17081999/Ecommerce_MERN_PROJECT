import React from "react";
import "./ConfirmOrder.css";
import { useDispatch, useSelector } from "react-redux";
import Metadata from "../layout/Metadata";
import CheckoutSteps from "./CheckoutSteps";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
const ConfirmOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  console.log(user);

  const subtotal = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const GST = subtotal * 0.18;
  const totalPrice = subtotal + shippingCharges + GST;

  const address = `${shippingInfo.address}, ${shippingInfo.state}, ${shippingInfo.pincode}, ${shippingInfo.country}`;

  const proceedToPaymentHandler = () => {
    const data = {
      shippingInfo,
      cartItems,
      taxPrice: GST,
      totalPrice,
      shippingCharges,
      address,
      user,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/payment");
  };
  return (
    <>
      <Metadata title="Confirm Order" />
      <CheckoutSteps activeSteps={1} />

      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user?.user?.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo?.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>

            <div className="confirmCartItems">
              <Typography>Your Cart Items:</Typography>

              <div className="confirmCartItemsContainer">
                {cartItems &&
                  cartItems.map((item) => (
                    <div key={item.id}>
                      <img src={item.image} alt={item.name} />
                      <Link to={`/product/${item.id}`}>{item.name}</Link>

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
        <div>
          <div className="orderSummary">
            <Typography>Order Summary</Typography>

            <div>
              <div>
                <p>Subtotal:</p>
                <span>{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>{GST}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
                <span>{totalPrice}</span>
              </p>
            </div>
            <button onClick={proceedToPaymentHandler}>
              Proceed To Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
