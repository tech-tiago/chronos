const User = require('../models/User');
const NewsComment = require('../models/NewsComment'); // Importa o model

module.exports = async function(req, res, next) {
  if (!req.session.user || !req.session.user.id) {
    req.flash('error', 'Acesso negado. Por favor, faça login.');
    return res.redirect('/minha-conta/login');
  }

  try {
    const user = await User.findById(req.session.user.id);
    
    if (user && user.role === 'admin') {
      // Esta linha causa o erro se a função não existir no model
      const pendingComments = await NewsComment.findAllPending();
      res.locals.pendingCommentCount = pendingComments.length;
      
      return next();
    } else {
      req.flash('error', 'Acesso negado. Você não tem permissão de administrador.');
      return res.redirect('/');
    }
  } catch (error) {
    // Este catch agora irá capturar o erro que você está vendo
    console.error("Erro no middleware ensureAdmin:", error); 
    next(error); // Passa o erro para o error handler do Express
  }
};