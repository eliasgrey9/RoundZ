const express = require("express");
const path = require("path");
const cors = require("cors");
const volleyball = require("volleyball");
const app = express();

// static middleware
app.use(express.static(path.join(__dirname, "..", "public")));

// logging middleware
app.use(cors());
app.use(volleyball);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
});

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./api"));

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public"));
});

// error handling middleware
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error");
});

module.exports = app;
