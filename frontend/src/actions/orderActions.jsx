import * as orderConstants from "../constants/orderConstants.js";

import axios from "axios";

//CREATE ORDER

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({
      type: orderConstants.CREATE_ORDER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/v1/order/new", order, config);

    console.log(data);

    dispatch({
      type: orderConstants.CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: orderConstants.CREATE_ORDER_FAILURE,
    });
  }
};

//GET ALL ORDERS
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: orderConstants.MY_ORDER_REQUEST,
    });
    const { data } = await axios.get("/api/v1/order/me");
    console.log(data);

    dispatch({
      type: orderConstants.MY_ORDER_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: orderConstants.MY_ORDER_FAILURE,
    });
  }
};
//GET ORDER DETAILS
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: orderConstants.ORDER_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/v1/orders/${id}`);
    console.log(data);

    dispatch({
      type: orderConstants.ORDER_DETAILS_SUCCESS,
      payload: data.orders[0],
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: orderConstants.ORDER_DETAILS_FAILURE,
    });
  }
};

//clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: orderConstants.CLEAR_ERRORS,
  });
};
