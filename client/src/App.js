import React, { useEffect, useState } from "react";
import {
  addExpense,
  populateNewExpenseForm,
  handleNewExpenseForm,
  loadExpenses,
} from "./store/appSlice";
import { useSelector, useDispatch } from "react-redux";
import { getAllContentfulData } from "./services";
import TextField from "./components/TextField/TextField";
import "./App.css";

function App() {
  const [showKeyboard, setShowKeyboard] = useState(false);
  const newExpensesForm = useSelector((state) => state.app.newExpensesForm);
  const shops = useSelector((state) => state.app.shops);
  const rooms = useSelector((state) => state.app.rooms);
  const categories = useSelector((state) => state.app.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(loadExpenses());
      const content = await getAllContentfulData();
      console.log(content);
      dispatch(populateNewExpenseForm(content));
    };
    fetchData();
  }, [dispatch]);

  const setFormField = (name, value) => {
    dispatch(handleNewExpenseForm({ name, value }));
  };

  return (
    <div className="App">
      <div className="container">
        <div className="new-expense-header">
          <div>
            <img src="/images/logo.png" alt="Casa Budget logo" />
          </div>
          <h1>New Expense</h1>
          <span className="new-expense-date">
            {newExpensesForm.date.substring(5, 10)}
          </span>
          <input
            className="expense-date"
            type="date"
            value={newExpensesForm.date}
            onChange={(e) => setFormField("date", e.target.value)}
          />
        </div>
        <div className="form">
          <TextField
            label="Expense"
            name="name"
            value={newExpensesForm.name}
            type="text"
          />
          <div
            className="amount-container"
            onClick={() => setShowKeyboard(true)}
          >
            <p className="label label-amount">Amount</p>
            <div className="amount-own-input">
              <span>
                {newExpensesForm.amount}
                <span
                  className="blink"
                  style={{ opacity: showKeyboard ? 1 : 0 }}
                >
                  |
                </span>
              </span>
            </div>
          </div>

          <p className="label">Shop</p>
          <div className="shops">
            {shops.map((shop) => (
              <img
                key={shop.name}
                className={`shop-image ${
                  newExpensesForm.shop === shop.name && "shop-selected"
                }`}
                src={shop.image}
                alt={shop.name}
                onClick={() => setFormField("shop", shop.name)}
              />
            ))}
          </div>
          <p className="label">Room</p>
          <div className="rooms">
            {rooms.map((room) => (
              <span
                key={room.name}
                className={`${
                  newExpensesForm.room === room.name && "room-selected"
                }`}
                onClick={() => setFormField("room", room.name)}
              >
                {room.name}
              </span>
            ))}
          </div>
          <p className="label">
            Categories <span className="cat-multiple">(multiple)</span>
          </p>
          <div className="categories">
            {categories.map((category) => (
              <span
                key={category.name}
                className={`${
                  newExpensesForm.category.includes(category.name) &&
                  "categories-selected"
                }`}
                onClick={() => setFormField("category", category.name)}
              >
                {category.name}
              </span>
            ))}
          </div>
          <TextField
            label="Worker"
            name="worker"
            type="text"
            isSearch={true}
            value={newExpensesForm.worker}
          />
          <TextField
            label="Company"
            name="company"
            type="text"
            isSearch={true}
            value={newExpensesForm.company}
          />
          <TextField
            label="Description"
            name="description"
            type="text"
            value={newExpensesForm.description}
          />

          <div className="form-bottom">
            <button onClick={() => dispatch(addExpense(newExpensesForm))}>
              Add expense
            </button>
          </div>
        </div>
      </div>
      <div className="keyboard" style={{ bottom: showKeyboard ? 0 : "-300px" }}>
        <div className="keyboard-header">
          <span onClick={() => setShowKeyboard(false)}>Done</span>
        </div>
        <div className="keyboard-numbers">
          {Array.from(Array(9).keys()).map((i) => (
            <span
              key={i}
              className="number"
              onClick={() =>
                setFormField("amount", newExpensesForm.amount + (i + 1))
              }
            >
              {i + 1}
            </span>
          ))}
          <span
            className="decimal"
            onClick={() => setFormField("amount", newExpensesForm.amount + ".")}
          >
            .
          </span>
          <span
            className="number"
            onClick={() => setFormField("amount", newExpensesForm.amount + 0)}
          >
            0
          </span>
          <span
            className="delete"
            onClick={() =>
              setFormField(
                "amount",
                newExpensesForm.amount.substring(
                  0,
                  newExpensesForm.amount.length - 1
                )
              )
            }
          >
            <img src="/images/delete.png" alt="erase icon" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
