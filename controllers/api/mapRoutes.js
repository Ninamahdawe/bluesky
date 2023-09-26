const router = require('express').Router();
const { Map } = require('../../models');
// const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const mapData = await Map.findAll();
    res.json(mapData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const mapData = await Map.findByPk(req.params.id);
    res.json(mapData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
