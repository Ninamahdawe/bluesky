const router = require('express').Router();
const { User } = require('../models');
// const { User } = require('../models');
const withAuth = require('../utils/auth');
const path = require('path');
const { Game } = require('../models/game');
// const Game = require(path.join(__dirname, '../../models/Game'));

router.get('/', async (req, res) => {
    try {
        const games = await Game.findAll();
        res.render('game', {
            games,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
router.delete('/:id', async (req, res) => {
    const gameId = req.params.id;

    try {
        const game = await Game.findByPk(gameId);

        if (!game) {
            return res.status(404).json({ message: ' Oh NO! Game not found' });
        }

        await game.destroy();
        res.json({ message: 'Game deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting the game' });
    }
});

module.exports = router;
