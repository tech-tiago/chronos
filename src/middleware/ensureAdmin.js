// Este middleware assume que você tem o model User com o método findById
const User = require('../models/User');

module.exports = async function(req, res, next) {
  // 1. Verifica se o usuário está logado
  if (!req.session.user || !req.session.user.id) {
    req.flash('error', 'Acesso negado. Por favor, faça login.');
    return res.redirect('/minha-conta/login');
  }

  try {
    // 2. Busca o usuário completo no banco de dados para verificar sua 'role'
    const user = await User.findById(req.session.user.id);
    
    // 3. Verifica se o usuário existe e se tem a role 'admin'
    if (user && user.role === 'admin') {
      return next(); // Tudo certo, o usuário é admin, pode prosseguir
    } else {
      req.flash('error', 'Acesso negado. Você não tem permissão de administrador.');
      return res.redirect('/'); // Redireciona para a home do site principal
    }
  } catch (error) {
    console.error("Erro no middleware ensureAdmin:", error);
    req.flash('error', 'Ocorreu um erro ao verificar suas permissões.');
    return res.redirect('/');
  }
};