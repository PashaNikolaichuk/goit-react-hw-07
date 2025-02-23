import { createSlice } from "@reduxjs/toolkit";

// 1. Оголошуєм початкове значення стану Redux
const initialState = {
  tasks: {
    item: [],
  },
};

const contactsSlices = createSlice({
  // ім'я цього slice.
  name: "contacts",
  //   початковий стан для tasks.
  initialState,
  //   об'єкт, який поки порожній, але сюди можна додавати логіку обробки стану, наприклад, додавання, видалення або оновлення контактів.
  reducers: {
    // Це поточний стан||Це об'єкт, який містить:type,payload
    //action - ||type - (наприклад, "ADD_CONTACT", "DELETE_CONTACT").
    // payload: Додаткові дані, які передаються разом із екшеном (наприклад, інформація про новий контакт).
    addTask: (state, action) => {
      state.tasks.item.push(action.payload);
    },
    deleteContact: (state, action) => {
      state.tasks.item = state.tasks.item.filter(
        (task) => task.id !== action.payload
      );
    },
  },
});

// contactsSlices.reducer: Основний reducer, який потрібно передати в store.
export const tasksReducer = contactsSlices.reducer;
export const { addTask, deleteContact } = contactsSlices.actions;

// Витягуємо список контактів
export const selectContacts = (state) => state.contacts.tasks.item;
