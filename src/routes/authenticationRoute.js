const express = require("express");
const { login, logout } = require("../controllers/authentication");
const authenticationRoute = express.Router();
authenticationRoute.get("/", () => {
  res.send("this is working");
});
authenticationRoute.post("/login", login);
authenticationRoute.post("/logout", logout);
module.exports = authenticationRoute;
