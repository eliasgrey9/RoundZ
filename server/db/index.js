// Brings Sequelize instance (`db`) together with each model

const db = require("./database");
const User = require("./User");
const Position = require("./Position");
const Question = require("./Question");
const Candidate = require("./Candidate");
const Answer = require("./Answer");

Position.hasMany(Question);
Question.belongsTo(Position);
Question.hasMany(Answer);
Answer.belongsTo(Question);
Candidate.hasMany(Answer);
Candidate.belongsTo(Position);
Position.hasMany(Candidate);
// Candidate.hasMany(Position);

module.exports = {
  db,
  User,
  Position,
  Question,
  Candidate,
  Answer,
};
