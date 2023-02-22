const Sequelize = require("sequelize");
const db = require("./database");

module.exports = db.define("candidate", {
  name: {
    type: Sequelize.STRING,
  },

  email: {
    type: Sequelize.STRING,
  },

  code: {
    type: Sequelize.STRING,
  },
});
