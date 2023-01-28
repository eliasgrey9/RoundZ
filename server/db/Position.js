const Sequelize = require("sequelize");
const db = require("./database");

module.exports = db.define("position", {
  title: {
    type: Sequelize.STRING,
  },

  status: {
    type: Sequelize.BOOLEAN,
  },

  invitations: {
    type: Sequelize.INTEGER,
  },
});
