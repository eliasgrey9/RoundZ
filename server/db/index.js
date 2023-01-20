// Brings Sequelize instance (`db`) together with each model

const db = require("./database");
const User = require("./User");

module.exports = {
  db,
  User,
};
