require("dotenv").config();

const express = require("express");
const cors = require("cors");

const expensesRouter = require("./routes/expensesRoutes");

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

app.use("/expenses", expensesRouter);

module.exports = app;
