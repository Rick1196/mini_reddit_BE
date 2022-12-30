const databasePool = require("../config/database");

const createComment = async ({ content, ownerId, postId }) => {
  try {
    await databasePool.query(
      "INSERT INTO COMMENTS(CONTENT, POST_OWNER_ID, POST_SUBREDDIT_ID, UP_VOTES, DOWN_VOTES, IS_EDITED ) VALUES($1, $2, $3, 0,0, FALSE)",
      [content, ownerId, postId]
    );
    return true;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const getAllComments = async ({ postId }) => {
  try {
    const { rows: comments } = await databasePool.query(
      "SELECT * FROM COMMENTS ORDERED BY CREATED_AT WHRE COMMENT_POST_ID = $1",
      [postId]
    );
    return comments;
  } catch (error) {
    console.error(error);
    return error;
  }
};

module.exports = { createComment, getAllComments };
