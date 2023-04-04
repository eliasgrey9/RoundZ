const Sequelize = require("sequelize");
const db = require("./database");

module.exports = db.define("user", {
  email: {
    type: Sequelize.STRING,
  },

  password: {
    type: Sequelize.STRING,
  },

  fullName: {
    type: Sequelize.STRING,
  },
  
});
