const Users = require("../models/authModel");

exports.checkLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  if (email === user.email && password === user.password) {
    return res.status(200).json({
      status: "success",
      isLogged: true,
    });
  }
  return res.status(401).json({
    status: "fail",
    isLogged: false,
    message: "Incorrect email or password",
  });
};
