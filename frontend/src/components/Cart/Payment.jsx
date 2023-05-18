import React, { useEffect, useRef } from "react";
import axios from "axios";
import "./Payment.css";
import Metadata from "../layout/Metadata";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import CheckoutSteps from "./CheckoutSteps";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearErrors, createOrder } from "../../actions/orderActions";
const Payment = ({ stripeKey }) => {
  const stripePromise = loadStripe(stripeKey);
  return (
    <Elements stripe={stripePromise}>
      <UseStripeFunc />
    </Elements>
  );
};

const UseStripeFunc = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useSelector((state) => state.user);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  const { error } = useSelector((state) => state.newOrder);

  // console.log(shippingInfo, user);
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo")) || null;

  //order Details
  console.log(orderInfo.cartItems);
  const order = {
    shippingInfo: shippingInfo,
    orderItems: orderInfo.cartItems,
    itemPrice: orderInfo.subTotal,
    taxPrice: orderInfo.taxPrice,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };
  console.log(cartItems);
  // console.log(orderInfo);
  const payBtn = useRef();

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;
      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.user.name,
            email: user.user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pincode,
              country: shippingInfo.country,
            },
          },
        },
      });
      if (result.error) {
        payBtn.current.disabled = false;
        console.log(result.error);
      } else if ((result.paymentIntent.status = "succeeded")) {
        order.paymentInfo = {
          id: result.paymentIntent.id,
          status: result.paymentIntent.status,
          payment_url: result.paymentIntent.payment_url,
        };

        dispatch(createOrder(order));
        navigate("/success");
      } else {
        console.log("error while processing");
      }

      console.log(data);
    } catch (error) {
      payBtn.current.disabled = false;
      console.log(error);
    }
  };

  useEffect(() => {
    if (error) {
      console.log(error);

      dispatch(clearErrors());
    }
  }, [error, dispatch]);
  return (
    <>
      <Metadata title="Payment" />
      <CheckoutSteps activeSteps={2} />

      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>

          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput"></CardNumberElement>
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>
          <input
            type="submit"
            value={`Pay - Rs. ${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>

      <></>
    </>
  );
};

export default Payment;
