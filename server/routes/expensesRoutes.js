const express = require("express");
const expensesController = require("../controllers/expensesController.js");
const router = express.Router();

router
  .route("/")
  .get(expensesController.getExpenses)
  .post(expensesController.addExpense);

module.exports = router;
