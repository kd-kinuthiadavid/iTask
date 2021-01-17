const express = require("express");
const passport = require("passport");
const Task = require("../models/Task");

const router = express.Router();

/**
 * @route  POST: api/task/add
 * @description create a task
 * @access Private
 */
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const parsedTask = {};
    req.body.userId
      ? (parsedTask.userId = req.body.userId)
      : res.status(400).json({ err: "A userId is required" });
    req.body.name
      ? (parsedTask.name = req.body.name)
      : res.status(400).json({ err: "A name is required" });
    req.body.description
      ? (parsedTask.description = req.body.description)
      : res.status(400).json({ err: "A name is required" });
    // we don't have to validate due date and dateAssigned since those have default values
    parsedTask.dateAssigned = req.body.dateAssigned;
    parsedTask.dueDate = req.body.dueDate;

    Task.create(parsedTask)
      .then((task) => res.json(task))
      .catch((err) =>
        console.error(
          "***** an error occurred while creating a task ******",
          err
        )
      );
  }
);

module.exports = router;
