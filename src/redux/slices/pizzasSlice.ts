import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export interface IPizzasSlice {
  loadingStatus: string;
}

interface IFetchPizza {
  category: string;
  type: string;
  currentPage: string;
  search: string;
}

export interface IPizzaItem {
  id: number;
  imageUrl: string;
  name: string;
  type: string;
  size: number;
  price: number;
  count: number;
}

const pizzasAdapter = createEntityAdapter();

const initialState = pizzasAdapter.getInitialState({
  loadingStatus: 'idle',
});

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.loadingStatus = 'loading';
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.loadingStatus = 'idle';
        pizzasAdapter.setAll(state, action.payload);
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.loadingStatus = 'error';
      })
      .addDefaultCase(() => {});
  },
});

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzas',
  async ({ category, type, currentPage, search }: IFetchPizza) => {
    try {
      const { data } = await axios.get<IPizzaItem[]>(
        `https://62d03ee71cc14f8c08876112.mockapi.io/pizzas?${
          +category > 0 ? `category=${category}` : ''
        }&sortBy=${type}&order=desc&page=${currentPage}&limit=4${
          search ? `&search=${search}` : ''
        }`,
      );

      return data;
    } catch {
      throw new Error();
    }
  },
);

export const pizzasSelectors = pizzasAdapter.getSelectors((state: RootState) => state.pizzas);

export const {} = pizzasSlice.actions;

export default pizzasSlice.reducer;
