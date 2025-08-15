const Character = require('../models/Character');
module.exports = {
  async dashboard(req, res) {
    if (!req.session.user) return res.redirect('/minha-conta/login');
    const chars = await Character.findByUser(req.session.user.id);
    res.render('account', { title: 'Minha Conta', tab: 'dashboard', chars });
  }
};
