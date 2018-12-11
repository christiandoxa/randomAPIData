const express = require('express');
const router = express.Router();
const api = require('../api/index');

router.get('/', api.getRandomOEE);
router.get('/quality', api.getRandomQuality);
router.get('/runtime', api.getRandomRuntime);
router.get('/downtime', api.getRandomDowntime);

module.exports = router;