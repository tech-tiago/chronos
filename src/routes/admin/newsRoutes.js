const router = require('express').Router();
const newsController = require('../../controllers/admin/newsController');

// Rota principal para listar notícias
router.get('/', newsController.list);

// Rotas para CRIAR uma notícia
router.get('/novo', newsController.showForm);
router.post('/novo', newsController.create);

// Rotas para EDITAR uma notícia
router.get('/:id/editar', newsController.showForm);
router.post('/:id/editar', newsController.update);

// Rota para DELETAR uma notícia
router.post('/:id/deletar', newsController.destroy);

module.exports = router;