const Sequelize = require("sequelize");
const db = require("./database");

module.exports = db.define("user", {
  email: {
    type: Sequelize.STRING,
  },

  password: {
    type: Sequelize.STRING,
  },

  firstName: {
    type: Sequelize.STRING,
  },

  lastName: {
    type: Sequelize.STRING,
  },

  userImg: {
    type: Sequelize.STRING,
  },

  userBio: {
    type: Sequelize.STRING,
  },

  linkedIn: {
    type: Sequelize.STRING,
  },

  companyName: {
    type: Sequelize.STRING,
  },

  companyWebsite: {
    type: Sequelize.STRING,
  },
});
