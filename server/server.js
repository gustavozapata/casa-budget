const mongoose = require("mongoose");
const app = require("./app");

// const DB = process.env.DB_URI.replace("<PASSWORD>", process.env.DB_PASSWORD);

// Local DB
const DB = process.env.DB_URI_LOCAL

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("*** Connected to the database ***");
  });

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`*** Server running on port ${port} ***`));
