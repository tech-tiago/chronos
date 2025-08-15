const router = require('express').Router();
const chroniclesController = require('../../controllers/admin/chroniclesController');

router.get('/', chroniclesController.list);
router.get('/novo', chroniclesController.showForm);
router.post('/novo', chroniclesController.create);
router.get('/:id/editar', chroniclesController.showForm);
router.post('/:id/editar', chroniclesController.update);
router.post('/:id/deletar', chroniclesController.destroy);

module.exports = router;