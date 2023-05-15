import * as cartConstant from "../constants/cartConstant.js";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case cartConstant.ADD_TO_CART:
      const item = action.payload;

      const isItemExists = state.cartItems.find(
        (i) => i.product === item.product
      );

      if (isItemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExists.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case cartConstant.REMOVE_FROM_CART:
      return {
        ...state,
        [action.payload.productId]: action.payload.quantity,
      };
    case cartConstant.CLEAR_CART:
      return {};
    default:
      return state;
  }
};
