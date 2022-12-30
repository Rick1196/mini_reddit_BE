require("dotenv").config();
const { auth } = require("../config/firebase");
const { getUserBy, postUserWithPool } = require("../models/user");

const login = async (req, res) => {
  const token = req.body?.token;
  const email = req.body?.email;
  if (token) {
    try {
      await auth.verifyIdToken(token);
      const user = await getUserBy("EMAIL", email);
      if (!user) {
        await postUserWithPool(email);
      }
      await res
        .cookie("credentials", token, { httpOnly: true, signed: true })
        .cookie("email", email, { httpOnly: true, signed: true })
        .json({ message: "Welcome" });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).send("Empty token");
  }
};

const logout = (req, res) => {
  res.clearCookie("credentials").clearCookie("email").send();
};

module.exports = { login, logout };
