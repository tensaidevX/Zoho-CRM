const express = require("express");
const port = 8000;
const app = express();

const db = require("./config/mongoose");
require("./config/passport");
const passport = require("passport");
const cors = require("cors");

app.use(cors());
app.use(express.json()); // to parse JSON bodies

app.use(express.urlencoded()); //Parse URL-encoded bodies

require("./config/passport");

app.use("/", require("./routes"));

// app.use(passport.initialize());

app.listen(port, () => console.log(`Server running on port ${port}`));
// use express router
