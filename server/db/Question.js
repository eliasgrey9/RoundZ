const Sequelize = require("sequelize");
const db = require("./database");

module.exports = db.define("Question", {
  question: {
    type: Sequelize.STRING,
  },

  position_id: {
    type: Sequelize.INTEGER,
  },
});
