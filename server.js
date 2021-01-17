const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const db = require("./config/dbConfig");

// import routes
const auth = require("./routes/auth.js");
const task = require("./routes/task");

// create an app instance
const app = express();

/**
 * test the db connection
 * @see - https://sequelize.org/master/manual/getting-started.html
 */
db.authenticate()
  .then(() =>
    console.log(
      "****** db connection has been established successfully *******"
    )
  )
  .catch((err) =>
    console.error("****** Err: Unable to connect to the database ******", err)
  );

// passport config
require("./config/passport")(passport);

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// passport middleware
app.use(passport.initialize());

// register routes
app.use("/api/auth", auth);
app.use("/api/task", task);

const port = process.env.PORT || 5000;

// test route
app.get("/", (req, res) => res.send("Hello world !!!"));

app.listen(port, () => console.log(`server running on PORT ${port}`));
