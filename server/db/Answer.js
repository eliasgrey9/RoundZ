const Sequelize = require("sequelize");
const db = require("./database");

module.exports = db.define("answer", {
  answer: {
    type: Sequelize.STRING,
  },
  questionId: {
    type: Sequelize.INTEGER,
  },

  inviteId: {
    type: Sequelize.STRING,
  },
});
