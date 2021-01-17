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

/**
 * @route  PATCH: api/task/:id
 * @description update a task
 * @access Private
 */
router.patch(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // fetch the task by id and then update if it exists
    Task.findByPk(req.params.id)
      .then((task) => {
        if (!task) {
          return res.status(404).json({ err: "We couldn't a find by that id" });
        }

        // update the task
        parsedTask = {};
        if (req.body.userId) parsedTask.userId = req.body.userId;
        if (req.body.name) parsedTask.name = req.body.name;
        if (req.body.description) parsedTask.description = req.body.description;
        if (req.body.dueDate) parsedTask.dueDate = req.body.dueDate;
        if (req.body.dateAssigned)
          parsedTask.dateAssigned = req.body.dateAssigned;

        Task.update(parsedTask, {
          where: { id: req.params.id },
          // return the updated object after update
          // @see - https://stackoverflow.com/a/40543424/10774498
          returning: true,
          plain: true,
        })
          .then((updatedTask) =>
            res.json({
              msg: "task updated successfully",
              data: updatedTask,
            })
          )
          .catch((err) =>
            console.error(
              "**** an error occurred while updating a task *****",
              err
            )
          );
      })
      .catch((err) =>
        console.error("**** err when fetching task by id *****", err)
      );
  }
);

/**
 * @route  GET: api/task/:id
 * @description get a task by it's id
 * @access Private
 */
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // get a task by id
    Task.findByPk(req.params.id)
      .then((task) => {
        if (!task) {
          return res
            .status(400)
            .json({ err: "A task by that id does not exist" });
        }

        return res.json(task);
      })
      .catch((err) =>
        console.error("***** err when fetching a task by id *****", err)
      );
  }
);

/**
 * @route  GET: api/task/all
 * @description get a list of all tasks
 * @access Private
 */
router.get(
  "/tasks/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // fetch all tasks
    Task.findAll()
      .then((tasks) => res.json(tasks))
      .catch((err) =>
        console.error(
          "***** an error occurred while fetching all tasks ****",
          err
        )
      );
  }
);

module.exports = router;
