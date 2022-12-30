require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
app.use(cookieParser(process.env.SECRET_KEY));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());
const server = http.createServer(app);
module.exports = { app, server };
