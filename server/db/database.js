// Establishes a connection to Postgres database by creating a Sequelize instance (called `db`).

const Sequelize = require("sequelize");
const pkg = require("../../package.json");

const db = new Sequelize(`postgres://localhost:5432/${pkg.name}`, {
  logging: false,
});

module.exports = db;
