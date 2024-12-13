const express = require('express');
const router = express.Router();

const { getDomains } = require('../controllers/domainController');  
const { auth } = require('../middlewares/auth');

router.get('/getDomains', getDomains);

module.exports = router;    