const databasePool = require("../config/database");
const { permissions } = require("../utils/consts");

const getUserBy = async (field, value) => {
  try {
    const { rows } = await databasePool.query(
      `SELECT ID, EMAIL FROM USERS WHERE ${field} = $1`,
      [value]
    );
    return rows[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};

const postUser = async (email) => {
  try {
    const userId = databasePool.query(
      "INSERT INTO USERS(EMAIL) VALUES($1) returning id",
      [email]
    );
    const user = getUserBy("ID", userId);
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const postUserWithPool = async (email) => {
  (async () => {
    // note: we don't try/catch this because if connecting throws an exception
    // we don't need to dispose of the client (it will be undefined)
    const client = await databasePool.connect();
    try {
      await client.query("BEGIN");
      const user = await client.query(
        "INSERT INTO USERS(EMAIL) VALUES($1) RETURNING ID",
        [email]
      );
      const permision = await client.query(
        "SELECT ID FROM PERMISSIONS WHERE PERMISSION = $1",
        [permissions.default]
      );
      await client.query(
        "INSERT INTO USER_PERMISSION(USER_ID, PERMISSION_ID) VALUES ($1, $2)",
        [user.rows[0].id, permision.rows[0].id]
      );
      await client.query("COMMIT");
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  })().catch((e) => console.error(e.stack));
};
module.exports = { getUserBy, postUser, postUserWithPool };
