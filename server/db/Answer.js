const Sequelize = require("sequelize");
const db = require("./database");

module.exports = db.define("answer", {
  answer: {
    type: Sequelize.STRING,
  },
});
