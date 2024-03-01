import { createSlice } from "@reduxjs/toolkit/react"
import { ICartProduct } from "../models/models";

interface IInitialState {
  cart: ICartProduct[] | [],
  offset: number,
  catId: number,
  currentQuery: string,
}

const initialState: IInitialState = {
  cart: JSON.parse(localStorage.getItem('cart') || '[]'),
  offset: 0,
  catId: 0,
  currentQuery: '',
}

const localhostSlice = createSlice({
  name: 'shoesShop',
  initialState,
  reducers: {
    resetOffset(state) {
      state.offset = 0;
    },
    setOffset(state) {
      state.offset += 6;
    },
    setCat(state, action) {
      state.catId = action.payload;
    },
    setCurrentQuery(state, action) {
      state.currentQuery = action.payload;
    },
    addToCart(state: { cart: ICartProduct[] }, action: { payload: ICartProduct }) {
      const productInCart = state.cart.find((product) => product.product?.id === action.payload.product?.id
        && product.checkedSize === action.payload.checkedSize);
      if (productInCart) {
        productInCart.quantity += action.payload.quantity;
        productInCart.priceSum += action.payload.priceSum;
      } else {
        state.cart.push(action.payload);
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter((product) => product?.product?.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    }
  }
})

export const localhostActions = localhostSlice.actions;
export const localhostReducer = localhostSlice.reducer;
