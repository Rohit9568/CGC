const express = require('express');
const router = express.Router();
const { validateToken } = require('../controllers/tokenController');

router.post('/validateToken', validateToken);

module.exports = router;
