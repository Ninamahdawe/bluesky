const router = require('express').Router();
const userRoutes = require('./userRoutes');
const gameRoutes = require('./gameRoutes');
const playerRoutes = require('./playerRoutes');
const mapRoutes = require('./mapRoutes');
const chunkRoutes = require('./chunkRoutes');
const characterRoutes = require('./characterRoutes');
// // const projectRoutes = require('./projectRoutes');

router.use('/users', userRoutes);
router.use('/game', gameRoutes);
router.use('/player', playerRoutes);
router.use('/map', mapRoutes);
router.use('/chunk', chunkRoutes);
router.use('/character', characterRoutes);
// // router.use('/projects', projectRoutes);

module.exports = router;
