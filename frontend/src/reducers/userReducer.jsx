import * as productConstants from "../constants/userConstants.js";

const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case productConstants.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
        user: action.payload,
        error: false,
      };
    case productConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        error: false,
      };
    case productConstants.LOGIN_FAILURE:
      return {
        loading: false,
        isAuthenticated: false,
        user: {},
        error: action.payload,
      };
    case productConstants.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
        user: action.payload,
        error: false,
      };
    case productConstants.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        error: false,
      };
    case productConstants.REGISTER_FAILURE:
      return {
        loading: false,
        isAuthenticated: false,
        user: {},
        error: action.payload,
      };
    case productConstants.LOAD_USER_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
        user: action.payload,
        error: false,
      };
    case productConstants.LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        error: false,
      };
    case productConstants.LOAD_USER_FAILURE:
      return {
        loading: false,
        isAuthenticated: false,
        user: {},
        error: action.payload,
      };
    case productConstants.LOGOUT_REQUEST:
      return {
        loading: true,
        error: false,
      };
    case productConstants.LOGOUT_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        user: {},
        error: false,
      };
    case productConstants.LOGOUT_FAILURE:
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

const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case productConstants.UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        user: action.payload,
        error: false,
      };
    case productConstants.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpadated: action.payload,
        error: false,
      };
    case productConstants.UPDATE_USER_RESET:
      return {
        ...state,
        loading: false,
        isUpadated: false,
        error: false,
      };
    case productConstants.UPDATE_USER_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    case productConstants.UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        user: action.payload,
        error: false,
      };
    case productConstants.UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpadated: action.payload,
        error: false,
      };
    case productConstants.UPDATE_EMAIL_RESET:
      return {
        ...state,
        loading: false,
        isUpadated: false,
      };
    case productConstants.UPDATE_PASSWORD_FAILURE:
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

const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case productConstants.FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        user: action.payload,
        error: false,
      };
    case productConstants.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        error: false,
      };
    case productConstants.FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        isUpadated: false,
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
export { profileReducer, forgotPasswordReducer };
export default userReducer;
