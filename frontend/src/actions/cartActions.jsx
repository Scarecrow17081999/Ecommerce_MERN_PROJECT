import axios from "axios";
import * as cartConstant from "../constants/cartConstant.js";

//clear errors
export const addToCart = (id, quantity) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
      type: cartConstant.ADD_TO_CART,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product._id,
        image: data.product.imagex[0].url,
        stock: data.product.stock,
        quantity: quantity,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    dispatch({
      type: cartConstant.ADD_TO_CART,
    });
  }
};
