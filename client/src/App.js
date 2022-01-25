import React, { useEffect } from "react";
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

  return (
    <div className="App">
      <div className="container">
        <h1>Casita Expenses Tracker</h1>
        <div className="form">
          <TextField name="Name" value={newExpensesForm.name} />
          <TextField name="Amount" value={newExpensesForm.amount} />
          {shops.map((shop) => (
            <span
              className="shop-image"
              style={{
                backgroundImage: `url(${shop.image})`,
                borderColor:
                  newExpensesForm.shop === shop.name ? "blue" : "transparent",
              }}
              key={shop.id}
              onClick={() =>
                dispatch(
                  handleNewExpenseForm({
                    element: "shop",
                    value: shop.name,
                  })
                )
              }
            ></span>
            // <img className="shop-image" src={shop.image} alt={shop.name} />
          ))}
          <br />
          {rooms.map((room) => (
            <span
              className="rooms"
              style={{
                border:
                  newExpensesForm.room === room.name
                    ? "1px solid red"
                    : "1px solid transparent",
              }}
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
          <br />
          {categories.map((category) => (
            <span className="rooms">{category.name}</span>
          ))}
        </div>
        <button onClick={() => dispatch(addExpense(newExpensesForm))}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
