const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expensesSchema = new Schema({
  name: String,
  description: String,
  shop: String,
  worker: String,
  room: String,
  category: String,
  amount: Number,
  date: Date,
});

module.exports = Expenses = mongoose.model("Expenses", expensesSchema);
