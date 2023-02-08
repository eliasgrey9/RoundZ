// Brings Sequelize instance (`db`) together with each model

const db = require("./database");
const User = require("./User");
const Position = require("./Position");
const Question = require("./Question");
const Invitee = require("./Invitee");
const Answer = require("./Answer");

// Question.belongsTo(Position);
Position.hasMany(Question);
Position.hasMany(Invitee);
Invitee.hasMany(Answer);
Question.hasMany(Answer);

module.exports = {
  db,
  User,
  Position,
  Question,
  Invitee,
  Answer,
};
