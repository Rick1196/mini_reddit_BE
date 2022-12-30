const databasePool = require("../config/database");

const createSubreddit = async ({ name, type, isNSFW, ownerId }) => {
  try {
    const isPrivate = type === "private";
    const isPublic = type === "public";
    await databasePool.query(
      "INSERT INTO SUBREDDITS(TITLE, IS_NSFW,IS_PRIVATE, IS_PUBLIC, SUBREDDIT_OWNER_ID ) VALUES($1, $2, $3, $4, $5)",
      [name, isNSFW, isPrivate, isPublic, ownerId]
    );
    return true;
  } catch (error) {
    console.error("blabla", error);
    throw new Error(
      error.message ||
        error ||
        "Is not possible to create a new subreddit at this moment"
    );
  }
};

const readAllSubreddits = async () => {
  try {
    const { rows: subs } = await databasePool.query(
      "SELECT * FROM SUBREDDITS"
    );
    return subs;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = { createSubreddit, readAllSubreddits };
