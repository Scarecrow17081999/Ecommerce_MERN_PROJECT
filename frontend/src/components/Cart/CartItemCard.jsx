import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";
const CartItemCard = ({ item, deleteCartItem }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt={item.id} />

      <div>
        <Link className="cartItemName" to={`product/${item.product}`}>
          {" "}
          <p> {item.name}</p>
        </Link>
        <br />
        <span>{`Price: ${item.price}`}</span>
        <p
          onClick={() => {
            deleteCartItem(item.product);
          }}
        >
          Remove
        </p>
      </div>
    </div>
  );
};

export default CartItemCard;
