import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  expenses: [],
  newExpensesForm: {
    name: "",
    amount: "",
    date: new Date().toISOString().slice(0, 10),
    description: "",
    worker: "",
    company: "",
    shop: "",
    room: "",
    category: [],
  },
  shops: [],
  rooms: [],
  categories: [],
  workers: [],
  companies: [],
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
      state.workers = action.payload.workers;
      state.companies = action.payload.companies;
    },
    handleNewExpenseForm: (state, action) => {
      if (action.payload.element === "category") {
        state.newExpensesForm[action.payload.element].push(
          action.payload.value
        );
      } else {
        state.newExpensesForm[action.payload.element] = action.payload.value;
      }
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
