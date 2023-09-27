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

router.put('/:id', async (req, res) => {
  try {
    const chunkData = await Chunk.update(
      {
        upChunkId: req.body.upChunkId,
        rightChunkId: req.body.rightChunkId,
        downChunkId: req.body.downChunkId,
        leftChunkId: req.body.leftChunkId,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!chunkData) {
      res.status(404).json({ message: 'No chunk found with this id!' });
      return;
    }

    res.status(200).json(chunkData);
  } catch (err) {
    res.status(500).json(err);
  }
})

router.post('/', async (req, res) => {
  try {
    const chunkData = await Chunk.create(req.body);
    res.status(200).json(chunkData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
