import { configureStore } from "@reduxjs/toolkit";
import { tasksReducer } from "./contactsSlice";
import { filterReducer } from "./filtersSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, tasksReducer);

// configureStore створює магазин Redux.
export const store = configureStore({
  //reducer — це об'єкт, у якому вказані ред'юсери (функції для обробки стану).
  //   У цьому випадку є один ред'юсер tasksReducer, що відповідає за гілку стану tasks.
  reducer: {
    contacts: persistedReducer,
    filter: filterReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
