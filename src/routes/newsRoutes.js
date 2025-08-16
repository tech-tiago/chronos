const router = require('express').Router();
const c = require('../controllers/newsController');

router.get('/', c.list);

router.get('/:id', c.show);

router.post('/:id/comentar', c.addComment);

module.exports = router;