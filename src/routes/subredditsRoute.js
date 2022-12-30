const express = require("express");
const {
  postSubreddit,
  getAllSubreddits,
} = require("../controllers/subreddits");
const sessionMiddleware = require("../middleware/session");
const subredditRoute = express.Router();
subredditRoute.use(sessionMiddleware);
subredditRoute.post("/", postSubreddit);
subredditRoute.get("/", getAllSubreddits);
module.exports = subredditRoute;
