const sequelize = require("../config/env.js");
const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class Posts extends Model {
  toJSON() {
    return { ...this.get(), password: undefined };
  }
}
Posts.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
    },
    title: {
      type: Sequelize.STRING(255),
      allowNull: false,
      field: "title",
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      field: "user_id",
    },
    image: {
      type: Sequelize.STRING(255),
      allowNull: false,
      field: "image",
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
      field: "content",
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
    modelName: "Posts",
    freezeTableName: true,
    tableName: "posts",
    timestamps: false,
  }
);

Posts.associate = ({ Users }) => {
  Posts.belongsTo(Users, {
    foreignKey: "userId",
    as: "user",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};
module.exports = () => Posts;
