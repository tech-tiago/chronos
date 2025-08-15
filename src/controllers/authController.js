const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = {
  loginForm(req, res) { res.render('account', { title: 'Minha Conta', tab: 'login' }); },
  registerForm(req, res) { res.render('account', { title: 'Minha Conta', tab: 'register' }); },

  async login(req, res) {
    const { username, password } = req.body;
    const user = await User.findByUsername(username);
    if (!user) { req.flash('error','Usuário não encontrado'); return res.redirect('/minha-conta'); }
    const ok = await bcrypt.compare(password, user.senha_hash);
    if (!ok) { req.flash('error','Senha inválida'); return res.redirect('/minha-conta'); }
    req.session.user = { id: user.id, username: user.username };
    req.flash('success', 'Bem-vindo de volta!');
    res.redirect('/minha-conta');
  },

  async register(req, res) {
    const { username, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    try {
      const id = await User.create({ username, email, senha_hash: hash });
      req.session.user = { id, username };
      req.flash('success', 'Conta criada com sucesso.');
      res.redirect('/minha-conta');
    } catch (e) {
      req.flash('error', 'Não foi possível criar a conta (username/email já existe?)');
      res.redirect('/minha-conta');
    }
  },

  logout(req, res) {
    req.session.destroy(() => res.redirect('/'));
  }
};
