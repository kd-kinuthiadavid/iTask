/**
 * @description - establishes a db connection
 * @see - https://sequelize.org/master/manual/getting-started.html
 */
const { Sequelize } = require("sequelize");

// destructure db secrets from doppler
const { DB_NAME, DB_PASSWORD, DB_USER } = process.env;

// create the connection
const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: "localhost",
  dialect: "postgres",
});

module.exports = db;
