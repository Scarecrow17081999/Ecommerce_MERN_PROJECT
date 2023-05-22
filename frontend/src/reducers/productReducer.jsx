import * as productConstants from "../constants/productConstants.js";

// get product reducer
export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case productConstants.ALL_PRODUCT_REQUEST:
    case productConstants.ADMIN_PRODUCT_REQUEST:
      return {
        loading: true,
        products: [],
        error: false,
      };
    case productConstants.ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.data,
        productCount: action.payload.productCount,
        resultPerPage: action.payload.resultPerPage,
        filteredProductsCount: action.payload.filteredProductsCount,
        error: false,
      };

    case productConstants.ADMIN_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case productConstants.ALL_PRODUCT_FAILURE:
    case productConstants.ADMIN_PRODUCT_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    case productConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
// new product request reducer
export const newProductReuquestReducer = (state = {}, action) => {
  switch (action.type) {
    case productConstants.NEW_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case productConstants.NEW_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload,
        error: false,
      };

    case productConstants.NEW_PRODUCT_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    case productConstants.NEW_PRODUCT_RESET:
      return {
        loading: false,
        success: false,
      };
    case productConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
// get product details
export const productDetailsReducer = (state = { product: [] }, action) => {
  switch (action.type) {
    case productConstants.PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
        product: {},
        error: false,
      };
    case productConstants.PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload.data,
        error: false,
      };
    case productConstants.PRODUCT_DETAILS_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    case productConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// create a product review

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case productConstants.NEW_REVIEW_REQUEST:
      return {
        loading: true,
        error: false,
      };
    case productConstants.NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case productConstants.NEW_REVIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case productConstants.NEW_REVIEW_RESET:
      return {
        ...state,
        success: false,
      };
    case productConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
// manupulate a product review

export const productsReducer = (state = {}, action) => {
  switch (action.type) {
    case productConstants.DELETE_PRODUCT_REQUEST:
    case productConstants.UPDATE_PRODUCT_REQUEST:
      return {
        loading: true,
        error: false,
      };
    case productConstants.DELETE_PRODUCT_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };
    case productConstants.UPDATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload,
      };
    case productConstants.DELETE_PRODUCT_FAILURE:
    case productConstants.UPDATE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case productConstants.DELETE_PRODUCT_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case productConstants.UPDATE_PRODUCT_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case productConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// get all product reviews
export const getAllProductReviewReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case productConstants.ALL_REVIEW_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case productConstants.ALL_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: action.payload,
        error: false,
      };
    case productConstants.ALL_REVIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case productConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
// admin reviews reducer
export const deleteReviewReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case productConstants.DELETE_REVIEW_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case productConstants.DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
        error: false,
      };
    case productConstants.DELETE_REVIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case productConstants.DELETE_REVIEW_RESET:
      return {
        ...state,
        loading: false,
        isDeleted: false,
      };
    case productConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
