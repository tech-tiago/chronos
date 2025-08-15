const router = require('express').Router();
const shopController = require('../../controllers/admin/shopController');

router.get('/', shopController.list);
router.get('/novo', shopController.showForm);
router.post('/novo', shopController.create);
router.get('/:id/editar', shopController.showForm);
router.post('/:id/editar', shopController.update);
router.post('/:id/deletar', shopController.destroy);

module.exports = router;