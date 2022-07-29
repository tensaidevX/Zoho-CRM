const mongoose = require("mongoose");
const db_url =
  "mongodb+srv://shubham-wb:ummfmAEi6I5AXk4u@cluster0.gsrx8y9.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(db_url);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

db.once("open", function () {
  console.log("Connected to Database :: MongoDB");
});

module.exports = db;
