const databasePool = require("../config/database");

const createPost = async ({ title, content, ownerId }) => {
  try {
    await databasePool.query(
      "INSERT INTO POSTS(TITLE, CONTENT, POST_OWNER_ID, UP_VOTES, DOWN_VOTES, IS_EDITED ) VALUES($1, $2, $3, 0,0, FALSE)",
      [title, content, ownerId]
    );
    return true;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const getAllPosts = async () => {
  try {
    const { rows: posts } = await databasePool.query(
      "SELECT * FROM POSTS ORDERED BY CREATED_AT"
    );
    return posts;
  } catch (error) {
    console.error(error);
    return error;
  }
};

module.exports = { createPost, getAllPosts };
