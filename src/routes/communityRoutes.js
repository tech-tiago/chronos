const router = require('express').Router();
const c = require('../controllers/communityController');
router.get('/', c.list);
router.get('/:id', c.show);
router.post('/:id/comentar', c.comment);
module.exports = router;
