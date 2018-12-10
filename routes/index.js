const express = require('express');
const router = express.Router();
const api = require('../api/index');

router.get('/', api.getRandomOEE);

module.exports = router;