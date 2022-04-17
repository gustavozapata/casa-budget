const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expensesSchema = new Schema({
  name: String,
  description: String,
  type: String,
  shop: String,
  worker: String,
  company: String,
  room: String,
  job: String,
  category: [String],
  amount: {
    type: Number,
    default: 0,
  },
  date: Date,
});

module.exports = Expenses = mongoose.model("Expenses", expensesSchema);
