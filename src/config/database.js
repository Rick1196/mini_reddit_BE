require("dotenv").config();
const Pool = require('pg').Pool
const databasePool = new  Pool({
  user: process.env.USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});
module.exports = databasePool;

