const Like = require('../models/Like');
const ensureAuth = require('../middleware/ensureAuth'); // Um middleware que apenas verifica se o usuário está logado

// Rota para dar/tirar like
router.post('/like', ensureAuth, async (req, res) => {
  const { type, id } = req.body;
  const userId = req.session.user.id;

  if (!['news', 'comment'].includes(type) || !id) {
    return res.status(400).json({ error: 'Dados inválidos' });
  }

  try {
    const result = await Like.toggle(userId, type, id);
    // Idealmente, aqui você retornaria a nova contagem de likes
    res.redirect('back'); // Simplesmente redireciona para a página anterior
  } catch (error) {
    res.status(500).json({ error: 'Erro no servidor' });
  }
});