const sequelize = require("../config/env.js");
const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class Messages extends Model {
  toJSON() {
    return { ...this.get(), password: undefined };
  }
}
Messages.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
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
    message: {
      type: Sequelize.STRING(255),
      allowNull: false,
      field: "message",
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
    modelName: "Messages",
    freezeTableName: true,
    tableName: "messages",
    timestamps: false,
  }
);

Messages.associate = ({ Users }) => {
  Messages.belongsTo(Users, {
    foreignKey: "userId",
    as: "user",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};
module.exports = () => Messages;
