import { configureStore } from '@reduxjs/toolkit';
import filters from './slices/filtersSlice';
import pizzas from './slices/pizzasSlice';
import cart from './slices/cartSlice';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: { filters, pizzas, cart },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
