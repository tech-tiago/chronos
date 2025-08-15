const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController'); // caminho correto

// Rota da página inicial
router.get('/', homeController.home);

module.exports = router;
