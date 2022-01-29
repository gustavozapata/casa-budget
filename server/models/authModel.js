const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  email: String,
  password: String,
});

module.exports = Users = mongoose.model("Users", usersSchema);
