const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Map extends Model {}

Map.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    game_id: {
        type: DataTypes.INTEGER,
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

module.exports = Map;
