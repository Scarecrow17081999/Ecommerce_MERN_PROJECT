import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";
import {
  deleteReviewReducer,
  getAllProductReviewReducer,
  newProductReuquestReducer,
  newReviewReducer,
  productDetailsReducer,
  productReducer,
  productsReducer,
} from "./reducers/productReducer";
import userReducer, {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  usersDetailsReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  allOrdersReducer,
  myOrdersDetailsReducer,
  myOrdersReducer,
  orderReducer,
  ordersReducer,
} from "./reducers/orderReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: orderReducer,
  myOrders: myOrdersReducer,
  orderDetails: myOrdersDetailsReducer,
  newReview: newReviewReducer,
  newProductRequest: newProductReuquestReducer,
  manupulateProducts: productsReducer,
  allOrders: allOrdersReducer,
  orders: ordersReducer,
  allUsers: allUsersReducer,
  userDetails: usersDetailsReducer,
  productReviews: getAllProductReviewReducer,
  deleteReview: deleteReviewReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};
const middleWare = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
