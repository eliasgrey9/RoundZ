// Brings Sequelize instance (`db`) together with each model

const db = require("./database");
const User = require("./User");
const Position = require("./Position");
const Question = require("./Question");
const Invitees = require("./Invitee");

Question.belongsTo(Position);
Position.hasMany(Question);
Position.hasMany(Invitees);

module.exports = {
  db,
  User,
  Position,
  Question,
  Invitees,
};
