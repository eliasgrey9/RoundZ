"use strict";
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("All routes in here start with API");
});

router.use("/users", require("./users"));

router.use((req, res, next) => {
  const err = new Error("API route not found!");
  // err.status = 404;
  next(err);
});

module.exports = router;
