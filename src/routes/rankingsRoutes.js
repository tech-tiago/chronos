const router = require('express').Router();
const c = require('../controllers/rankingsController');
router.get('/', c.list);
module.exports = router;
