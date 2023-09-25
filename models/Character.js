const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Character extends Model {}

Character.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatarId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    playerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'players',
        key: 'id',
        unique: true
      }
    }
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: 'character',
  }
);

module.exports = Character;
