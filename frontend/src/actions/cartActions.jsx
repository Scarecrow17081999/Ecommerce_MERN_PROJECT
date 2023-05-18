import axios from "axios";
import * as cartConstant from "../constants/cartConstants.js";

//ADD TO CART
export const addToCart = (id, quantity) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
      type: cartConstant.ADD_TO_CART,
      payload: {
        id: data.data._id,
        product: data.data._id,
        name: data.data.name,
        price: data.data.price,
        image: data.data.images[0].url,
        stock: data.data.stock,
        quantity: quantity,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    dispatch({
      type: cartConstant.CART_FAILURE,
    });
  }
};

// REMOVE FORM CART
export const removeFromCart = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: cartConstant.REMOVE_FROM_CART,
      payload: id,
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    dispatch({
      type: cartConstant.CART_FAILURE,
    });
  }
};

//SAVE SHIPPING INFO

export const saveShippingInfo = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: cartConstant.SAVE_SHIPPING_INFO,
      payload: data,
    });
    localStorage.setItem("shippingInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: cartConstant.CART_FAILURE,
    });
  }
};
