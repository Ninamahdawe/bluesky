const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Chunk extends Model {}

Chunk.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    grid: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    mapId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'maps',
        key: 'id',
        unique: true
      }
    },
    upChunkId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'chunks',
        key: 'id',
        unique: true
      }
    },
    rightChunkId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'chunks',
        key: 'id',
        unique: true
      }
    },
    downChunkId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'chunks',
        key: 'id',
        unique: true
      }
    },
    leftChunkId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'chunks',
        key: 'id',
        unique: true
      }
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: 'chunk',
  }
);

module.exports = Chunk;
