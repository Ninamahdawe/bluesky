const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const playRoutes = require('./playRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/play', playRoutes);

module.exports = router;
