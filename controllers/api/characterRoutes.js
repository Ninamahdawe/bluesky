const router = require('express').Router();
const { Character } = require('../../models');
// const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const characterData = await Character.findAll();
    res.json(characterData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const characterData = await Character.findByPk(req.params.id);
    res.json(characterData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
