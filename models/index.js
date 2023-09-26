const User = require('./User');
const Game = require('./Game');
const Character = require('./Character');
const Map = require('./Map');
const Chunk = require('./Chunk');

// 1 Map to Many Chunks
Map.hasMany(Chunk, {
    foreignKey: 'map_id',
});
Chunk.belongsTo(Map);

// 1 Game to 1 Map
Game.hasOne(Map, {
    foreignKey: 'game_id',
});
Map.belongsTo(Game);

// 1 User to many Characters
User.hasMany(Character, {
    foreignKey: '',
})

// 1 Player to Many Characters
// Player.hasMany(Character, {
//     foreignKey: 'player_id',
// });
// Character.belongsTo(Player);

// 1 Map to Many Chunks
// Map.hasMany(Chunk, {
//     foreignKey: 'map_id',
// });
// Chunk.belongsTo(Map);

// 1 Map to 1 Game
// Map.hasOne(Game, {
//     foreignKey: 'game_id',
// });
// Game.belongsTo(Map);

// Character.belongsTo(Player, {
//     foreignKey: 'player_id',
// });

// Character.hasOne(Player, {
//     foreignKey: 'player_id',
// });

// Player.hasMany(Character, {
//     foreignKey: 'player_id',
// })

// Player.hasMany(Character)

// Chunk.hasOne(Map, {
//     foreignKey: 'map_id',
// });

// Player.hasOne(User, {
//     foreignKey: 'user_id',
// });

// Player.hasMany(Game, {
//     foreignKey: 'game_id',
// });

// Map.hasOne(Game, {
//     foreignKey: 'game_id',
// });

module.exports = { User, Game, Character, Map, Chunk };
