const User = require('./User');
const Game = require('./Game');
const Character = require('./Character');
const Map = require('./Map');
const Chunk = require('./Chunk');
// const Project = require('./Project');

// User.hasMany(Project, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE'
// });

// Project.belongsTo(User, {
//   foreignKey: 'user_id'
// });

module.exports = { User, Game, Character, Map, Chunk };
