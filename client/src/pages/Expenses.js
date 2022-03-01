import React from "react";
import { useSelector } from "react-redux";
import Header from "../layout/Header";
import "./Expenses.css";

const Expenses = () => {
  const expenses = useSelector((state) => state.app.expenses);

  return (
    <div className="Expenses">
      <Header />
      <div className="expenses-header">
        <h1>Expenses</h1>
      </div>
      <div className="expenses-main">
        <div className="list-header">
          <span>Name</span>
          <span>Amount</span>
          <span>Date</span>
        </div>
        <div className="expenses-list">
          {expenses.map((expense) => (
            <div className="expense-item" key={expense._id}>
              <span>{expense.name}</span>
              <span>£{expense.amount}</span>
              <span>
                {new Date(expense.date).toISOString().substring(0, 10)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Expenses;
