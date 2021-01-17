const express = require("express");
const bodyParser = require("body-parser");

// create an app instance
const app = express();

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

// test route
app.get("/", (req, res) => res.send("Hello world !!!"));

app.listen(port, () => console.log(`server running on PORT ${port}`));
