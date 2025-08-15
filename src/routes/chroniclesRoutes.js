const router = require('express').Router();
const c = require('../controllers/chroniclesController');
router.get('/', c.list);
module.exports = router;
