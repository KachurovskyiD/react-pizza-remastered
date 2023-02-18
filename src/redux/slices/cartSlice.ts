import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcCartValues } from '../../utils/calcCartValues';
import { getCartFromLS } from '../../utils/getCartFromLS';

export interface ICartItem {
  id: number;
  imageUrl: string;
  name: string;
  type: string;
  size: number;
  price: number;
  count: number;
}

export interface ICartSlice {
  items: ICartItem[];
  totalCount: number;
  totalPrice: number;
}

const dataLS = getCartFromLS();
const { totalPrice, totalCount } = calcCartValues(dataLS);

const initialState: ICartSlice = {
  items: dataLS,
  totalCount: totalCount,
  totalPrice: totalPrice,
};

function cartValuesUpdate(state: ICartSlice) {
  state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
  state.totalCount = state.items.reduce((sum, obj) => obj.count + sum, 0);
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ICartItem>) {
      const findItem = state.items.find((item) => item.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      cartValuesUpdate(state);
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      cartValuesUpdate(state);
    },
    minusItem(state, action: PayloadAction<number>) {
      const findItem = state.items.find((item) => item.id === action.payload);
      if (findItem && findItem.count > 1) {
        findItem.count--;
      }
      cartValuesUpdate(state);
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

export const { addToCart, removeFromCart, minusItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
