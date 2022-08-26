const Sequelize = require("sequelize");

const sequelize = new Sequelize("afro_blog", "root", "mysql", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;
