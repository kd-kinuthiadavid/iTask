/**
 * @description - establishes a db connection
 * @see - https://sequelize.org/master/manual/getting-started.html
 */
const { Sequelize } = require("sequelize");
const keys = require("../keys");

const { DB_NAME, DB_PASSWORD, DB_USER } = keys;

// create the connection
const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: "localhost",
  dialect: "postgres",
});

module.exports = db;
