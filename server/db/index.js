// Brings Sequelize instance (`db`) together with each model

const db = require("./database");
const User = require("./User");
const Position = require("./Position");
const Question = require("./Question");

module.exports = {
  db,
  User,
  Position,
  Question,
};
