const router = require('express').Router();
const userRoutes = require('./userRoutes');
const gameRoutes = require('./gameRoutes');
const mapRoutes = require('./mapRoutes');
const chunkRoutes = require('./chunkRoutes');
const characterRoutes = require('./characterRoutes');

router.use('/users', userRoutes);
router.use('/games', gameRoutes);
router.use('/maps', mapRoutes);
router.use('/chunks', chunkRoutes);
router.use('/characters', characterRoutes);

module.exports = router;
