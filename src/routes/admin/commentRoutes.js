const router = require('express').Router();
const commentController = require('../../controllers/admin/commentController');

// Rota para a página principal de moderação
router.get('/', commentController.listPending);

// Rotas para as ações de aprovar e deletar
router.post('/:id/aprovar', commentController.approve);
router.post('/:id/deletar', commentController.destroy);

module.exports = router;