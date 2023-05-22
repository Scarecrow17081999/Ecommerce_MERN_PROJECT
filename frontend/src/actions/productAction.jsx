import axios from "axios";
import * as productConstants from "../constants/productConstants.js";
//GET USER PRODUCTS//

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

//GET ADMIN PRODUCTS//
export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: productConstants.ADMIN_PRODUCT_REQUEST,
    });
    const { data } = await axios.get(`/api/v1/admin/products`);
    dispatch({
      type: productConstants.ADMIN_PRODUCT_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: productConstants.ADMIN_PRODUCT_FAILURE,
      payload: error,
    });
  }
};

// GET PRODUCT DETAILS
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
      payload: error,
    });
  }
};
// CREATE NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({
      type: productConstants.NEW_REVIEW_REQUEST,
    });
    console.log(reviewData);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/v1/product/reviews`,
      reviewData,
      config
    );
    dispatch({
      type: productConstants.NEW_REVIEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: productConstants.NEW_REVIEW_FAILURE,
      payload: error,
    });
  }
};

// CREATE NEW Product
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({
      type: productConstants.NEW_PRODUCT_REQUEST,
    });
    console.log(productData);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/v1/admin/product/new`,
      productData,
      config
    );
    dispatch({
      type: productConstants.NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: productConstants.NEW_PRODUCT_FAILURE,
      payload: error,
    });
  }
};

// CREATE NEW Product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: productConstants.DELETE_PRODUCT_REQUEST,
    });

    const { data } = await axios.delete(`/api/v1/admin/product/${id}`);
    dispatch({
      type: productConstants.DELETE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: productConstants.DELETE_PRODUCT_FAILURE,
      payload: error,
    });
  }
};
// UPDATE Product
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({
      type: productConstants.UPDATE_PRODUCT_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/v1/admin/product/${id}`,
      productData,
      config
    );
    dispatch({
      type: productConstants.UPDATE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: productConstants.UPDATE_PRODUCT_FAILURE,
      payload: error,
    });
  }
};

// GET ALL REVIEWS OF A PRODUCT ADMIN
export const getAllReview = (id) => async (dispatch) => {
  try {
    dispatch({
      type: productConstants.ALL_REVIEW_REQUEST,
    });
    const { data } = await axios.get(`/api/v1/product/reviews/${id}`);
    dispatch({
      type: productConstants.ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: productConstants.ALL_REVIEW_FAILURE,
      payload: error,
    });
  }
};
// DELETE REVIEWS OF A PRODUCT ADMIN
export const deleteReview = (productId, id) => async (dispatch) => {
  try {
    dispatch({
      type: productConstants.DELETE_REVIEW_REQUEST,
    });
    const { data } = await axios.delete(
      `/api/v1/product/reviews?productId=${productId}&id=${id}`
    );
    dispatch({
      type: productConstants.DELETE_REVIEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: productConstants.DELETE_REVIEW_FAILURE,
      payload: error,
    });
  }
};

//clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: productConstants.CLEAR_ERRORS,
  });
};
