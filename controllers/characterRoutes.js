const router = require('express').Router();
const { Character, Game, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const characterData = await Character.findAll();

    // Serialize data so the template can read it
    const character = characterData.map((game) => character.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('character', {
      character,
      // logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});