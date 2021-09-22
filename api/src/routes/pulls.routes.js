const express = require('express');

const Pulls = require('../controllers/pulls.controller');

const router = express.Router();

router.route('/pulls').get(Pulls.list);

module.exports = router;
