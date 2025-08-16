const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const ensureAuth = require('../middleware/ensureAuth');
const Like = require('../models/Like');


router.get('/', homeController.home);

router.post('/like', ensureAuth, async (req, res) => {
  const { type, id } = req.body;
  const userId = req.session.user.id;

if (!['news', 'comment', 'community_post', 'community_comment'].includes(type) || !id) {
  req.flash('error', 'Requisição inválida.');
  return res.redirect('back');
}

    try {
    await Like.toggle(userId, type, id);
    // Linha corrigida e segura
    res.redirect(req.get('Referrer') || '/');
    } catch (error) {
    console.error("Erro ao processar like:", error);
    req.flash('error', 'Ocorreu um erro ao processar sua curtida.');
    // Linha corrigida e segura
    res.redirect(req.get('Referrer') || '/');
    }
});

module.exports = router;