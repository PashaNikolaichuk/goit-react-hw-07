import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// всі запити axios тепер автоматично починаються з цього URL.
axios.defaults.baseURL = "https://67bb2601fbe0387ca13939cb.mockapi.io";

//createAsyncThunk допомогає виконувати HTTP-запит
export const fetchData = createAsyncThunk(
  "contacts/fetchAll",
  //(thunkAPI) Використовуємо символ підкреслення як ім'я першого параметра, тому що в цій операції він нам не потрібен
  //(thunkAPI)   Цей об'єкт дає тобі доступ до додаткових можливостей Redux Toolkit
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/contacts");
      return data;
    } catch (error) {
      // При помилці запиту повертаємо проміс який буде відхилений з текстом помилки
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addTask = createAsyncThunk(
  "contacts/addContact",
  async (newContact, thunkAPI) => {
    try {
      const { data } = await axios.post("/contacts", newContact);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (taskId, thunkAPI) => {
    try {
      await axios.delete(`/contacts/${taskId}`);
      return taskId;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
