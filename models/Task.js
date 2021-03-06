const { DataTypes, Sequelize } = require("sequelize");
const db = require("../config/dbConfig");

/**
 * define a task model
 * @see - https://sequelize.org/master/manual/model-basics.html
 */
const Task = db.define(
  "Task",
  // define model attrs
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false, // a task must be assigned to someone
      references: {
        model: "users",
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
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
 * @description - model and db synchronisation
 * @see - https://sequelize.org/master/manual/model-basics.html
 * @todo - remove this logic in prod; reason -> we should use migrations in prod
 */
Task.sync({ alter: true })
  .then(() =>
    console.log("****** Task db and model sync was successfull *****")
  )
  .catch((err) =>
    console.error("***** Task db and model sync failed *******", err)
  );

module.exports = Task;
