const sequelize = require('../config/connection');
const { User, Game, Character, Map, Chunk, Player } = require('../models');

const userData = require('./userData.json');
const gameData = require('./gameData.json');
const characterData = require('./characterData.json');
const mapData = require('./mapData.json');
const chunkData = require('./chunkData.json');
const playerData = require('./playerData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const game of gameData) {
    await Game.create({
      ...game
    })
  }

  for (const character of characterData) {
    await Character.create({
      ...character
    })
  }

  for (const map of mapData) {
    await Map.create({
      ...map
    })
  }

  for (const chunk of chunkData) {
    await Chunk.create({
      ...chunk
    })
  }

  for (const player of playerData) {
    await Player.create({
      ...player
    })
  }

  process.exit(0);
};

seedDatabase();
