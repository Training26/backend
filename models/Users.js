const sequelize = require("../config/env.js");
const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class Users extends Model {}
Users.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: false,
      field: "name",
    },
    email: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true,
      field: "email",
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false,
      field: "password",
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      field: "createdAt",
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      field: "updatedAt",
    },
  },
  {
    sequelize,
    modelName: "Users",
    freezeTableName: true,
    tableName: "users",
    timestamps: false,
  }
);

Users.associate = ({ Posts, Messages }) => {
  Users.hasMany(Posts, {
    foreignKey: "userId",
    as: "posts",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Users.hasMany(Messages, {
    foreignKey: "userId",
    as: "messages",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};
module.exports = () => Users;
