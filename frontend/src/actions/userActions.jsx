import * as productConstants from "../constants/userConstants.js";
import axios from "axios";

//login user
export const login = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.LOGIN_REQUEST,
      });
      const { data } = await axios.post(
        `/api/v1/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: productConstants.LOGIN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: productConstants.LOGIN_FAILURE,
        payload: error.response.data.message,
      });
    }
  };
};

//register user
export const register = (userData) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      dispatch({
        type: productConstants.REGISTER_REQUEST,
      });
      const { data } = await axios.post(`/api/v1/register`, userData, config);
      dispatch({
        type: productConstants.REGISTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: productConstants.REGISTER_FAILURE,
        payload: error.response.data.message,
      });
    }
  };
};

//load user
export const loadUser = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.LOAD_USER_REQUEST,
      });
      const { data } = await axios.get(`/api/v1/me`);
      dispatch({
        type: productConstants.LOAD_USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: productConstants.LOAD_USER_FAILURE,
        payload: error.response.data.message,
      });
    }
  };
};

//logout user
export const logoutUser = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.LOGOUT_REQUEST,
      });
      await axios.get(`/api/v1/logout`);
      dispatch({
        type: productConstants.LOGOUT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: productConstants.LOGOUT_FAILURE,
        payload: error.response.data.message,
      });
    }
  };
};
//update user
export const updateUser = (userData) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      dispatch({
        type: productConstants.UPDATE_USER_REQUEST,
      });
      await axios.put(`/api/v1/me/update`, userData, config);
      dispatch({
        type: productConstants.UPDATE_USER_SUCCESS,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: productConstants.UPDATE_USER_FAILURE,
        payload: error.response.data.message,
      });
    }
  };
};

//update user password
export const updateUserPassword = (userData) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      dispatch({
        type: productConstants.UPDATE_PASSWORD_REQUEST,
      });
      const { data } = await axios.put(
        `/api/v1/password/update`,
        userData,
        config
      );
      dispatch({
        type: productConstants.UPDATE_PASSWORD_SUCCESS,
        payload: data,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
      dispatch({
        type: productConstants.UPDATE_PASSWORD_FAILURE,
        payload: error,
      });
    }
  };
};

//forgot password
export const forgotUserPassword = (email) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.FORGOT_PASSWORD_REQUEST,
      });
      const { data } = await axios.post(
        `/api/v1/password/forgot`,

        email,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: productConstants.FORGOT_PASSWORD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: productConstants.FORGOT_PASSWORD_FAILURE,
        payload: error.response.data.message,
      });
    }
  };
};

//load  all user
export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.ALL_USER_REQUEST,
      });
      const { data } = await axios.get(`/api/v1/admin/users`);
      dispatch({
        type: productConstants.ALL_USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: productConstants.ALL_USER_FAILURE,
        payload: error.response.data.message,
      });
    }
  };
};
//load  user details
export const getUsersDetails = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.USER_DETAIL_REQUEST,
      });
      const { data } = await axios.get(`/api/v1/admin/user/${id}`);
      dispatch({
        type: productConstants.USER_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: productConstants.USER_DETAIL_FAILURE,
        payload: error.response.data.message,
      });
    }
  };
};

//update user
export const updateUserByAdmin = (id, userData) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      dispatch({
        type: productConstants.UPDATE_USER_DETAIL_REQUEST,
      });
      const { data } = await axios.put(
        `/api/v1/admin/user/${id}`,
        userData,
        config
      );
      dispatch({
        type: productConstants.UPDATE_USER_DETAIL_SUCCESS,
        payload: data,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
      dispatch({
        type: productConstants.UPDATE_USER_DETAIL_FAILURE,
        payload: error,
      });
    }
  };
};
//deleteUser user
export const deleteUserByAdmin = (id) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      dispatch({
        type: productConstants.DELETE_USER_DETAIL_REQUEST,
      });
      const { data } = await axios.delete(`/api/v1/admin/user/${id}`);
      dispatch({
        type: productConstants.DELETE_USER_DETAIL_SUCCESS,
        payload: data,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
      dispatch({
        type: productConstants.DELETE_USER_DETAIL_FAILURE,
        payload: error,
      });
    }
  };
};

//clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: productConstants.CLEAR_ERRORS,
  });
};
