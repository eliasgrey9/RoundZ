const Sequelize = require("sequelize");
const db = require("./database");

module.exports = db.define("question", {
  question: {
    type: Sequelize.STRING,
  },
});
