const router = require('express').Router();
const userRoutes = require('./userRoutes');
const gameRoutes = require('./gameRoutes');
// // const projectRoutes = require('./projectRoutes');

router.use('/users', userRoutes);
router.use('/game', gameRoutes);
// // router.use('/projects', projectRoutes);

module.exports = router;
