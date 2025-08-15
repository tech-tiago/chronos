const router = require('express').Router();
const c = require('../controllers/shopController');
router.get('/', c.list);
module.exports = router;
