const router = require('express').Router();
const c = require('../controllers/supportController');
router.get('/', c.form);
router.post('/', c.create);
module.exports = router;
