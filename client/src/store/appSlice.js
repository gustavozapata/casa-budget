import { createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { getAllContentfulData } from "../services";

const initialState = {
  expenses: [],
  suggestions: [],
  textFieldFocus: "",
  serverError: "",
  isLogged: JSON.parse(localStorage.getItem("isLogged")),
  // isLogged: false,
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
  dashboardData: {},
};

export const appSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setExpenses: (state, action) => {
      state.expenses = action.payload;
    },
    setLogin: (state, action) => {
      state.isLogged = action.payload;
      localStorage.setItem("isLogged", JSON.stringify(action.payload));
      state.serverError = "";
    },
    logout: (state) => {
      state.isLogged = false;
      localStorage.setItem("isLogged", JSON.stringify(false));
    },
    setDashboardData: (state) => {
      let shops = state.expenses.map((expense) => expense.shop);
      let workers = state.expenses.map((expense) => expense.worker);

      calculateCategoryTotal(state, shops, "shops", "shop");
      calculateCategoryTotal(state, workers, "workers", "worker");

      let amounts = state.expenses.map((expense) => expense.amount);
      state.dashboardData.total = amounts.reduce((a, b) => a + b);
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
    setContent: (state, action) => {
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

export const calculateCategoryTotal = (state, category, types, type) => {
  return (state.dashboardData[types] = category
    .filter((value, index, self) => self.indexOf(value) === index)
    .map((element) => ({
      name: element,
      total: state.expenses
        .filter((expense) => expense[type] === element)
        .reduce((acc, curr) => acc + curr.amount, 0),
    })));
};

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
  setContent,
  focusTextField,
  selectSuggestion,
  setLogin,
  setDashboardData,
  setServerError,
  logout,
} = appSlice.actions;

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

// on app launch and/or on refresh
export const loadInitialData = () => async (dispatch) => {
  await dispatch(loadExpenses());
  await dispatch(loadContent());
  await dispatch(setDashboardData());
};

export const loadExpenses = () => async (dispatch) => {
  const expenses = await axios.get(`http://localhost:4000/expenses`);
  console.log(expenses.data.data);
  dispatch(setExpenses(expenses.data.data));
};

export const loadContent = () => async (dispatch) => {
  const content = await getAllContentfulData();
  console.log(content);
  dispatch(setContent(content));
};

export const addExpense = (expense) => async () => {
  await axios.post(
    `http://localhost:4000/expenses`,
    { expense }
    // { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` } }
  );
  return true;
};

export default appSlice.reducer;
