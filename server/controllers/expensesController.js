const Expenses = require("../models/expensesModel");

exports.getExpenses = async (req, res) => {
  const expenses = await Expenses.find({}).sort({date: -1});
  res.status(200).json({
    status: "success",
    data: expenses,
  });
};

exports.addExpense = async (req, res) => {
  const expense = await Expenses.create(req.body.expense);
  res.status(201).json({
    status: "success",
    data: expense,
  });
};
