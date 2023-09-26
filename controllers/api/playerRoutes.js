const router = require('express').Router();
const { Player } = require('../../models');
// const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const playerData = await Player.findAll();
    res.json(playerData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const playerData = await Player.findByPk(req.params.id);
    res.json(playerData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
