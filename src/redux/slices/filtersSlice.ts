import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISearchPizzaParams {
  category: number;
  search: string;
  currentPage: number;
  sort: ISortType;
}

export interface ISortType {
  name: string;
  type: string;
}

export interface IFiltersSlice {
  category: number;
  search: string;
  currentPage: number;
  sort: ISortType;
}

const initialState: IFiltersSlice = {
  category: 0,
  search: '',
  currentPage: 1,
  sort: {
    name: 'популярності',
    type: 'rating',
  },
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<number>) {
      state.category = action.payload;
    },
    setSort(state, action: PayloadAction<ISortType>) {
      state.sort = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<IFiltersSlice>) {
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.category = Number(action.payload.category);
    },
  },
});

export const { setCategory, setSort, setSearch, setCurrentPage, setFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
