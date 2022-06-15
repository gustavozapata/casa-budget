import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Filter from "../components/Filter/Filter";
import Header from "../layout/Header";
import { filterExpenses, sortExpensesBy } from "../store/appSlice";
import "./Expenses.css";

const Expenses = () => {
  const [sortType, setSortType] = useState("date");
  const expensesList = useSelector((state) => state.app.expensesList);
  const dispatch = useDispatch();

  const sortBy = (value) => {
    setSortType(value);
    dispatch(sortExpensesBy(value));
  };

  return (
    <div className="Expenses">
      <Header />
      <div className="expenses-header">
        <h1>Expenses</h1>
      </div>
      <Filter handleChange={(e) => dispatch(filterExpenses(e.target.value))} />
      <div className="expenses-main">
        <div className="list-header">
          <span onClick={() => sortBy("name")}>
            Name{" "}
            {sortType === "name" && (
              <img src="/images/arrow-down.png" alt="arrow down" />
            )}
          </span>
          <span onClick={() => sortBy("amount")}>
            Amount{" "}
            {sortType === "amount" && (
              <img src="/images/arrow-down.png" alt="arrow down" />
            )}
          </span>
          <span onClick={() => sortBy("date")}>
            Date{" "}
            {sortType === "date" && (
              <img src="/images/arrow-down.png" alt="arrow down" />
            )}
          </span>
        </div>
        <div className="expenses-list">
          {expensesList.map((expense) => (
            <div className="expense-item" key={expense._id}>
              <span>{expense.name}</span>
              <span>£{expense.amount}</span>
              <span>
                {/* {new Date(expense.date).toISOString().substring(0, 10)} */}
                {new Date(expense.date)
                  .toLocaleString("en-GB")
                  .substring(0, 10)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Expenses;
