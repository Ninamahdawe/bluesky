const router = require('express').Router();
const { Chunk } = require('../../models');
// const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const chunkData = await Chunk.findAll();
    res.json(chunkData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const chunkData = await Chunk.findByPk(req.params.id);
    res.json(chunkData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
