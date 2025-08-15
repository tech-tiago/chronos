const router = require('express').Router();
const c = require('../controllers/galleryController');
router.get('/', c.list);
module.exports = router;
