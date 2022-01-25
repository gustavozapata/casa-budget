import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  expenses: [],
  newExpensesForm: {
    name: "",
    amount: "",
    date: "",
    description: "",
    worker: "",
    shop: "",
    room: "",
    category: "",
  },
  shops: [],
  rooms: [],
  categories: [],
};

export const appSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    loadExpenses: (state, action) => {
      state.expenses = action.payload;
    },
    populateNewExpenseForm: (state, action) => {
      state.shops = action.payload.shops;
      state.rooms = action.payload.rooms;
      state.categories = action.payload.categories;
    },
    handleNewExpenseForm: (state, action) => {
      state.newExpensesForm[action.payload.element] = action.payload.value;
    },
  },
});

export const { loadExpenses, handleNewExpenseForm, populateNewExpenseForm } =
  appSlice.actions;

export const addExpense = (expense) => async (dispatch) => {
  const newExpense = await axios.post(
    `http://localhost:4000/expenses`,
    { expense }
    // { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` } }
  );
  console.log(newExpense);
  dispatch(loadExpenses(newExpense.data));
};

export default appSlice.reducer;
