module.exports = function ensureAuth(req, res, next) {
  if (req.session.user && req.session.user.id) {
    return next();
  }

  req.flash('error', 'Você precisa estar logado para realizar esta ação.');
  res.redirect('/minha-conta/login');
};