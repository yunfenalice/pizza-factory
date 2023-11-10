import { createSlice } from '@reduxjs/toolkit';
import { cartStorage } from '../../signals/cartSignals';
// state management principles:we should always derive state not store total price or total quantity. Otherwise, we have to keep them async
const initialState = {
  cart: [...cartStorage.value],
  //   cart: [
  //     {
  //       pizzaId: 12,
  //       name: 'Mediterranean',
  //       quantity: 2,
  //       unitPrice: 16,
  //       totalPrice: 32,
  //     },
  //   ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      // payload=newItem {}

      state.cart.push(action.payload);

      cartStorage.value = [...cartStorage.value, action.payload];
    },
    deleteItem(state, action) {
      //payload=pizzaId
      // splice, or filter
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      cartStorage.value = cartStorage.value.filter(
        (item) => item.id !== action.payload,
      );
    },
    increseItemQuantity(state, action) {
      //payload=pizzaId
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
      cartStorage.value = cartStorage.value.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            quantity: item.quantity + 1,
            totalPrice: item.quantity * item.unitPrice,
          };
        }
        return item;
      });
    },
    decreaseItemQuantity(state, action) {
      //payload=pizzaId
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      cartStorage.value = cartStorage.value.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            quantity: item.quantity - 1,
            totalPrice: item.quantity * item.unitPrice,
          };
        }
        return item;
      });
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
      cartStorage.value = [];
    },
  },
});
export const {
  addItem,
  deleteItem,
  increseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);
export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.id === id)?.quantity ?? 0; //if null or undefined, ??, as 0 is a valid number here
export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);
export const getCart = (state) => state.cart.cart;
