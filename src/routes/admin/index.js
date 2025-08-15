const router = require('express').Router();
const dashboardController = require('../../controllers/admin/dashboardController');

// Rota principal do painel (/admin)
router.get('/', dashboardController.index);

// Delega as rotas de cada módulo
router.use('/noticias', require('./newsRoutes'));
router.use('/cronicas', require('./chroniclesRoutes')); // Adicionar esta linha
router.use('/loja', require('./shopRoutes')); // Adicionar esta linha
router.use('/suporte', require('./supportRoutes'));
// Adicione aqui as rotas de crônicas, loja, galeria e usuários quando criá-las.
// Ex: router.use('/loja', require('./shopRoutes'));

module.exports = router;