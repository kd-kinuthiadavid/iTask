const express = require("express");
const User = require("../models/User");

const router = express.Router();

// test '/'
router.get("/", (req, res) => {
  res.send("/api/auth/ works");
});

/**
 * @route  POST: api/auth/register
 * @description register a user
 * @access Public
 */
router.post("/register", (req, res) => {
  // find user by email
  User.findAll({
    where: {
      email: req.body.email,
    },
  })
    .then((result) => {
      // if user exists, return an err
      if (result.length) {
        return res
          .status(400)
          .json({ email: "A user with that email address already exists" });
      }

      // if a user doesn't exist, create one
      const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        isAdmin: true,
        dateOfBirth: req.body.dateOfBirth,
      };

      // create the user in the db
      User.create(newUser)
        .then((user) => res.json(user))
        .catch((err) =>
          console.error(
            "**** an error occurred while creating a user ****",
            err
          )
        );
    })
    .catch((err) =>
      console.error(
        "*** an error occurred when fetching a user by email *****",
        err
      )
    );
});

module.exports = router;
