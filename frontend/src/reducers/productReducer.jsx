import * as productConstants from "../constants/productConstants.js";

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case productConstants.ALL_PRODUCT_REQUEST:
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
    case productConstants.ALL_PRODUCT_FAILURE:
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
