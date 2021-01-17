const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/dbConfig");

// import routes
const auth = require("./routes/auth.js");

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

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// register routes
app.use("/api/auth", auth);

const port = process.env.PORT || 5000;

// test route
app.get("/", (req, res) => res.send("Hello world !!!"));

app.listen(port, () => console.log(`server running on PORT ${port}`));
