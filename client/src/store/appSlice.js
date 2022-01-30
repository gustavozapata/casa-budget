import { useEffect } from "react";
import { createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  expenses: [],
  suggestions: [],
  textFieldFocus: "",
  serverError: "",
  // isLogged: JSON.parse(localStorage.getItem("isLogged")),
  isLogged: true,
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
  total: 0,
};

export const appSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setExpenses: (state, action) => {
      state.expenses = action.payload;
      console.log(action.payload);
    },
    setLogin: (state, action) => {
      state.isLogged = action.payload;
    },
    setDashboardData: (state) => {
      let amounts = state.expenses.map((expense) => expense.amount);
      state.total = amounts.reduce((a, b) => a + b);
    },
    setServerError: (state, action) => {
      state.serverError = action.payload;
    },
    focusTextField: (state, action) => {
      state.textFieldFocus = action.payload.name;
      populateSuggestions(state, action);
    },
    selectSuggestion: (state, action) => {
      state.newExpensesForm[action.payload.name] = action.payload.value;
      state.textFieldFocus = "";
    },
    populateNewExpenseForm: (state, action) => {
      state.shops = action.payload.shops;
      state.rooms = action.payload.rooms;
      state.categories = action.payload.categories;
    },
    handleNewExpenseForm: (state, action) => {
      if (action.payload.name === "category") {
        if (state.newExpensesForm.category.includes(action.payload.value)) {
          state.newExpensesForm.category = state.newExpensesForm[
            action.payload.name
          ].filter((element) => element !== action.payload.value);
        } else {
          state.newExpensesForm[action.payload.name].push(action.payload.value);
        }
      } else {
        if (
          state.newExpensesForm[action.payload.name] === action.payload.value
        ) {
          state.newExpensesForm[action.payload.name] = "";
        } else {
          state.newExpensesForm[action.payload.name] = action.payload.value;
        }
      }
      populateSuggestions(state, action);
    },
  },
});

export const populateSuggestions = (state, action) => {
  if (action.payload.isSearch) {
    // populate suggestions
    state.suggestions = state.expenses
      .filter((expense) => expense[action.payload.name])
      .map((expense) => expense[action.payload.name]);

    // remove duplicates
    state.suggestions = state.suggestions.filter(
      (item, index) => state.suggestions.indexOf(item) === index
    );

    // filter suggestions
    state.suggestions = state.suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(action.payload.value.toLowerCase())
    );
    // return state.suggestions;
  }
};

export const {
  setExpenses,
  handleNewExpenseForm,
  populateNewExpenseForm,
  focusTextField,
  selectSuggestion,
  setLogin,
  setDashboardData,
  setServerError,
} = appSlice.actions;

export const addExpense = (expense) => async () => {
  const newExpense = await axios.post(
    `http://localhost:4000/expenses`,
    { expense }
    // { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` } }
  );
  console.log(newExpense);
};

export const loadExpenses = () => async (dispatch) => {
  const expenses = await axios.get(`http://localhost:4000/expenses`);
  console.log(expenses.data.data);
  dispatch(setExpenses(expenses.data.data));
};

export const login = (email, password) => async (dispatch) => {
  try {
    const user = await axios.post(`http://localhost:4000/login`, {
      email,
      password,
    });
    dispatch(setLogin(user.data.isLogged));
  } catch (e) {
    console.log("Casa Budget Error", e.response);
    dispatch(setServerError(e.response.data.message));
  }
};

export default appSlice.reducer;
