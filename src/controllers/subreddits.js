const { getUserBy } = require("../models/user");
const { createSubreddit, readAllSubreddits } = require("../models/subreddit");

const postSubreddit = async (req, res) => {
  const { email } = req.signedCookies;
  const { name, type, isNSFW } = req.body;
  if (email) {
    try {
      const user = await getUserBy("EMAIL", email);
      if (user) {
        await createSubreddit({ name, type, isNSFW, ownerId: user.id });
      } else {
        throw new Error("Owner not found");
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  } else {
    res.status(403).send("Empty owner");
  }
};

const getAllSubreddits = async (req, res) => {
  try {
    const subs = await readAllSubreddits();
    res.status(200).json(subs);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { postSubreddit, getAllSubreddits };
