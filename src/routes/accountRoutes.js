const router = require('express').Router();
const auth = require('../controllers/authController');
const account = require('../controllers/accountController');

router.get('/', account.dashboard);
router.get('/login', auth.loginForm);
router.get('/registrar', auth.registerForm);
router.post('/login', auth.login);
router.post('/registrar', auth.register);
router.post('/logout', auth.logout);

module.exports = router;
