import { createSelector, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchData, addTask, deleteContact } from "./contactsOps";

// 1. Оголошуєм початкове значення стану Redux
const initialState = {
  tasks: {
    item: [],
    isLoading: false,
    error: null,
  },
};

const contactsSlices = createSlice({
  // ім'я цього slice.
  name: "contacts",
  //   початковий стан для tasks.
  initialState,
  //   об'єкт, який поки порожній, але сюди можна додавати логіку обробки стану, наприклад, додавання, видалення або оновлення контактів.
  reducers: {},
  // Додаємо обробку зовнішніх екшенів
  extraReducers: (builder) => {
    // якщо хтось виконує fetchData, злови цю операцію і використай ці дані з нашого Slices
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        //  action.payload потрапляє наша data
        //замість пустого масиву записуєм те шо прийшло з data
        state.tasks.item = action.payload;
        state.tasks.isLoading = false;
        state.tasks.error = null;
      })

      // addTask
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.isLoading = false;
        state.tasks.error = null;
        state.tasks.item.push(action.payload);
      })

      // deleteContact
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.tasks.item = state.tasks.item.filter(
          (item) => item.id !== action.payload
        );
        state.tasks.isLoading = false;
      })
      .addMatcher(
        isAnyOf(fetchData.pending, addTask.pending, deleteContact.pending),
        (state) => {
          state.tasks.isLoading = true;
          state.tasks.error = null;
        }
      )
      .addMatcher(
        isAnyOf(fetchData.rejected, addTask.rejected, deleteContact.rejected),
        (state, action) => {
          state.tasks.error = action.payload;
          state.tasks.isLoading = false;
        }
      );
  },
});

// contactsSlices.reducer: Основний reducer, який потрібно передати в store.
export const tasksReducer = contactsSlices.reducer;
export const { setLoading, setError, fetchDataSuccess } =
  contactsSlices.actions;

// Витягуємо список контактів
export const selectContacts = (state) => state.contacts.tasks.item;
export const selectLoading = (state) => state.contacts.tasks.isLoading;
export const selectError = (state) => state.contacts.tasks.error;
export const selectFilter = (state) => state.filters.filters.name;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts = [], filter = "") => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);
