const router = require('express').Router();
const { Game } = require('../../models');
// const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const gameData = await Game.findAll();
    res.json(gameData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
