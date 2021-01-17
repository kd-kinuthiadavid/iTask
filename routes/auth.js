const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// test '/'
router.get("/", (req, res) => {
  res.send("/api/auth/ works");
});

/**
 * @route  GET: api/auth/user/:id
 * @description get a user by their id
 * @access Private
 */
router.get(
  "/user/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findByPk(req.params.id)
      .then((user) => res.json(user))
      .catch((err) =>
        console.error("****** err fetching user by id *********", err)
      );
  }
);

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

/**
 * @route  POST: api/auth/login
 * @description login a user
 * @access Public
 */
router.post("/login", (req, res) => {
  const email = req.body.email;
  // find user by email
  User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        // user doesn't exist
        return res
          .status(404)
          .json({ err: "A user with that email doesn't exist" });
      }

      /**
       * if user exsists:
       *  a. use user info to create a jwt payload
       *  b. sign and return the token
       */

      const jwtPayload = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
        dateOfBirth: user.dateOfBirth,
      };

      const jwtPrivateKey = process.env.JWT_SECRET;

      jwt.sign(jwtPayload, jwtPrivateKey, { expiresIn: 3600 }, (err, token) => {
        if (err) {
          console.error(
            "**** an error occurred while signing jwt token ****",
            err
          );
        }

        // return the token
        res.json({
          success: true,
          msg: "jwt auth token received",
          token: `Bearer ${token}`,
        });
      });
    })
    .catch((err) =>
      console.error("******* err when fetching user by email ******", err)
    );
});

module.exports = router;
