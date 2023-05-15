import axios from "axios";
import * as productConstants from "../constants/productConstants.js";

export const getProducts =
  (
    keyword = "",
    price = [0, 25000],
    currentPage = 1,
    category = "",
    ratings = 0
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: productConstants.ALL_PRODUCT_REQUEST,
      });
      const link = `/api/v1/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&page=${currentPage}&category=${category}&ratings[gte]=${ratings}`;

      const link2 = `/api/v1/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&page=${currentPage}&ratings[gte]=${ratings}`;
      const { data } = await axios.get(category ? link : link2);
      dispatch({
        type: productConstants.ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: productConstants.ALL_PRODUCT_FAILURE,
        payload: error,
      });
    }
  };

export const getProductDetails = (productId) => async (dispatch) => {
  try {
    dispatch({
      type: productConstants.PRODUCT_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/v1/product/${productId}`);
    dispatch({
      type: productConstants.PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: productConstants.PRODUCT_DETAILS_FAILURE,
      error: error,
    });
  }
};
//clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: productConstants.CLEAR_ERRORS,
  });
};
