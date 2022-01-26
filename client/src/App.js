import React, { useEffect, useState } from "react";
import {
  addExpense,
  populateNewExpenseForm,
  handleNewExpenseForm,
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
      const content = await getAllContentfulData();
      console.log(content);
      dispatch(populateNewExpenseForm(content));
    };
    fetchData();
  }, [dispatch]);

  // function handleClickOutside(event) {
  //   if (event.target.className !== "numeric-container") {
  //     setShowKeyboard(false);
  //   }
  // }
  // document.addEventListener("mousedown", handleClickOutside);

  return (
    <div className="App">
      <div className="container">
        <div className="new-expense-header">
          <div>
            <img src="/images/logo.png" alt="Casa Budget logo" />
          </div>
          <h1>New Expense</h1>
          <span className="new-expense-date">27 Jan</span>
          <input className="expense-date" type="date" />
        </div>
        <div className="form">
          <TextField
            label="Expense"
            name="name"
            value={newExpensesForm.name}
            type="text"
          />
          {/* <TextField
            label="Amount"
            name="amount"
            type="number"
            center={true}
            value={newExpensesForm.amount}
          /> */}
          <div
            className="amount-container"
            onClick={() => setShowKeyboard(true)}
          >
            <p className="label label-amount">Amount</p>
            <div className="amount-own-input">
              <span>
                {newExpensesForm.amount}
                <span className="blink">|</span>
              </span>
            </div>
          </div>

          <p className="label">Shop</p>
          <div className="shops">
            {shops.map((shop) => (
              <img
                className={`shop-image ${
                  newExpensesForm.shop === shop.name && "shop-selected"
                }`}
                src={shop.image}
                alt={shop.name}
                onClick={() =>
                  dispatch(
                    handleNewExpenseForm({ element: "shop", value: shop.name })
                  )
                }
              />
            ))}
          </div>
          <p className="label">Room</p>
          <div className="rooms">
            {rooms.map((room) => (
              <span
                className={`${
                  newExpensesForm.room === room.name && "room-selected"
                }`}
                onClick={() =>
                  dispatch(
                    handleNewExpenseForm({
                      element: "room",
                      value: room.name,
                    })
                  )
                }
              >
                {room.name}
              </span>
            ))}
          </div>
          <p className="label">
            Categories <span>(multiple)</span>
          </p>
          <div className="categories">
            {categories.map((category) => (
              <span
                className={`${
                  newExpensesForm.category === category.name &&
                  "categories-selected"
                }`}
              >
                {category.name}
              </span>
            ))}
          </div>

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
            <span className="number">{i + 1}</span>
          ))}
          <span className="decimal">.</span>
          <span className="number">0</span>
          <span className="delete">
            <img src="/images/delete.png" alt="erase icon" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
