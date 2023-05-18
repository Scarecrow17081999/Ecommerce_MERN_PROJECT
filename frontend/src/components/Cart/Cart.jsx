import React from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../actions/cartActions";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Metadata from "../layout/Metadata";
// import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCartIcon";
const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;

    if (stock <= quantity) {
      return;
    }
    dispatch(addToCart(id, newQty));
  };
  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;

    if (1 >= quantity) {
      return;
    }
    dispatch(addToCart(id, newQty));
  };
  const deleteCartItem = (id) => {
    dispatch(removeFromCart(id));
  };
  return (
    <>
      <Metadata title="Cart" />

      {Boolean(cartItems.length) ? (
        <div className="cartPage">
          <div className="cartHeader">
            <p>Product</p>
            <p>Quantity</p>
            <p>Sub Total</p>
          </div>
          {cartItems &&
            cartItems.map((item, i) => (
              <div key={item.id} className="cartContainer">
                <CartItemCard item={item} deleteCartItem={deleteCartItem} />
                <div className="cartInput">
                  <button
                    onClick={() => {
                      decreaseQuantity(item.id, item.quantity, item.stock);
                    }}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    name=""
                    id=""
                    readOnly
                    value={item.quantity}
                  />
                  <button
                    onClick={() => {
                      increaseQuantity(item.id, item.quantity, item.stock);
                    }}
                  >
                    +
                  </button>
                </div>
                <p className="cartSubtotal">
                  {" "}
                  {`Rs. ${item.price * item.quantity}`}
                </p>
              </div>
            ))}

          <div className="cartGrossProfit">
            <div></div>

            <div className="cartGrossProfitBox">
              <p>Gross Profit</p>
              <p>{`Rs.${cartItems.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
              )}`}</p>
            </div>
            <div></div>

            <div className="checkOutBtn">
              <button>
                <Link to={"/shipping"}>Check Out</Link>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="emptyCart">
          {/* <RemoveShoppingCartIcon/> */}
          <Typography>No Product in Your Cart</Typography>
          <Link to={"/products"}>View Procucts</Link>
        </div>
      )}
    </>
  );
};

export default Cart;
