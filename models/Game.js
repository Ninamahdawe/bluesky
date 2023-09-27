const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Game extends Model {}

Game.init(
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
        unique: true,
      }
    },
    mapId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'maps',
        key: 'id',
        unique: true,
      }
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: 'game',
  }
);

module.exports = Game;
