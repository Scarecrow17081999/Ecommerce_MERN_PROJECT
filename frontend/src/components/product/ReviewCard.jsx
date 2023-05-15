import React from "react";
import profilePng from "../../images/logo.svg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./ProductDetails.css";
import { StyledEngineProvider } from "@mui/material";
const ReviewCard = ({ data }) => {
  return (
    <StyledEngineProvider>
      <div className="reviewCard">
        <AccountCircleIcon />
        {/* <img src={<AccountCircleIcon />} alt="User" /> */}
        <p>{data.name ? data.name : "User"}</p>
        <span>{data.comment ? data.comment : "User"}</span>
      </div>
    </StyledEngineProvider>
  );
};

export default ReviewCard;
