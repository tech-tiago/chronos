module.exports = function ensureAuth(req, res, next) {
  if (!req.session.user) return res.redirect('/minha-conta/login');
  next();
};
