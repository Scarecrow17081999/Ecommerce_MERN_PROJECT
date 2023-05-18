import React from "react";
import "./OrderSuccess.css";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircleOutlineIcon />

      <Typography>Your Order has been Placed Successfully</Typography>

      <Link to="/order/me">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
