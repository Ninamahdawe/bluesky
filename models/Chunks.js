const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Chunks extends Model {}

Map.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    grid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: 'map',
  }
);

module.exports = Chunks;
