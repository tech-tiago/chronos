const router = require('express').Router();
const supportController = require('../../controllers/admin/supportController');

router.get('/', supportController.list);
router.get('/:id', supportController.view);
router.post('/:id/responder', supportController.reply);

module.exports = router;