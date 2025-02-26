import { configureStore } from "@reduxjs/toolkit";
import { tasksReducer } from "./contactsSlice";
import { filterReducer } from "./filtersSlice";

// configureStore створює магазин Redux.
export const store = configureStore({
  //reducer — це об'єкт, у якому вказані ред'юсери (функції для обробки стану).
  //   У цьому випадку є один ред'юсер tasksReducer, що відповідає за гілку стану tasks.
  reducer: {
    contacts: tasksReducer,
    filters: filterReducer,
  },
});
