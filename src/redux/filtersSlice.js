import { createSlice } from "@reduxjs/toolkit";

// 1. Оголошуєм початкове значення стану Redux
const initialState = {
  filters: {
    name: "",
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.filters.name = action.payload;
    },
  },
});

export const filterReducer = filterSlice.reducer;
export const { changeFilter } = filterSlice.actions;

// Отримати значення фільтра
export const selectNameFilter = (state) => state.filter.filters.name;
