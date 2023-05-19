import * as orderConstants from "../constants/orderConstants.js";
// create new order
export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case orderConstants.CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstants.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    case orderConstants.CREATE_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case orderConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// my orders request
export const myOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case orderConstants.MY_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstants.MY_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case orderConstants.MY_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case orderConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// my orders details request
export const myOrdersDetailsReducer = (state = { order: [] }, action) => {
  switch (action.type) {
    case orderConstants.ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstants.ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    case orderConstants.ORDER_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case orderConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// admin orders request
export const allOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case orderConstants.ALL_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstants.ALL_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case orderConstants.ALL_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case orderConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// admin orders request edit
export const ordersReducer = (state = {}, action) => {
  switch (action.type) {
    case orderConstants.UPDATE_ORDER_REQUEST:
    case orderConstants.DELETE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstants.UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case orderConstants.DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case orderConstants.UPDATE_ORDER_FAILURE:
    case orderConstants.DELETE_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case orderConstants.UPDATE_ORDER_RESET:
      return {
        ...state,
        loading: false,
        isUpdated: false,
      };
    case orderConstants.DELETE_ORDER_RESET:
      return {
        ...state,
        loading: false,
        isDeleted: false,
      };

    case orderConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
