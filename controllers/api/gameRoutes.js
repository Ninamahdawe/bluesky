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

router.get('/:id', async (req, res) => {
  try {
    const gameData = await Game.findByPk(req.params.id);
    res.json(gameData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const gameData = await Game.update(
      {
        mapId: req.body.mapId,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!gameData) {
      res.status(404).json({ message: 'No game found with this id!' });
      return;
    }

    res.status(200).json(gameData);
  } catch (err) {
    res.status(500).json(err);
  }
})

router.post('/', async (req, res) => {
  try {
    req.body.userId = req.session.userId;
    const gameData = await Game.create(req.body);
    res.status(200).json(gameData);
  } catch (err) {
    res.status(500).json(err);
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const gameData = await Game.destroy({
      where: {
        id: req.params.id,
      }
    });

    if (!gameData) {
      res.status(404).json({ message: 'No game found with this id!' });
      return;
    }

    res.status(200).json(gameData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
