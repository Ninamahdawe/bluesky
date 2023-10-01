const User = require('./User');
const Game = require('./Game');
const Character = require('./Character');
const Map = require('./Map');
const Chunk = require('./Chunk');

// 1 Map to Many Chunks
Map.hasMany(Chunk, {
    foreignKey: 'mapId',
});
Chunk.belongsTo(Map);

// 1 Game to 1 Map
Game.hasOne(Map, {
    foreignKey: 'gameId',
});
Map.belongsTo(Game);

// 1 User to many Characters
User.hasMany(Character, {
    foreignKey: 'userId',
})

// 1 User to many Games
User.hasMany(Game, {
    foreignKey: 'userId',
})
Game.belongsTo(User);

module.exports = { User, Game, Character, Map, Chunk };
