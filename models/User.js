const { DataTypes, Sequelize } = require("sequelize");
const Task = require("./Task");
const db = require("../config/dbConfig");

/**
 * define a user model
 * @see - https://sequelize.org/master/manual/model-basics.html
 */
const User = db.define(
  "User",
  // define model attrs
  {
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  // define other model options
  {
    tableName: "users",
  }
);

/**
 * @description - model and db synchronisation
 * @see - https://sequelize.org/master/manual/model-basics.html
 * @todo - remove this logic in prod; reason -> we should use migrations in prod
 */
User.sync({ alter: true })
  .then(() =>
    console.log("****** User db and model sync was successfull *****")
  )
  .catch((err) =>
    console.error("***** User db and model sync failed *******", err)
  );

module.exports = User;
