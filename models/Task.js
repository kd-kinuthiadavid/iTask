const { DataTypes, Sequelize } = require("sequelize");
const User = require("./User");
const db = require("../config/dbConfig");

/**
 * define a task model
 * @see - https://sequelize.org/master/manual/model-basics.html
 */
const Task = db.define(
  "Task",
  // define model attrs
  {
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    dateAssigned: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    dueDate: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  // define other model options
  {
    tableName: "tasks",
  }
);

/**
 * define a M:1 association with the User model
 * i.e, one user can have many tasks
 */
Task.belongsTo(User);

/**
 * @description - model and db synchronisation
 * @see - https://sequelize.org/master/manual/model-basics.html
 * @todo - remove this logic in prod; reason -> we should use migrations in prod
 */
User.sync({ alter: true })
  .then(() =>
    console.log("****** Task db and model sync was successfull *****")
  )
  .catch((err) =>
    console.error("***** Task db and model sync failed *******", err)
  );

module.exports = Task;
