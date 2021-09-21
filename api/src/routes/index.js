const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    return res.send({ message: 'pull-requests-api' });
});

module.exports = router;
