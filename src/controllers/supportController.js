const Support = require('../models/SupportTicket');
module.exports = {
  async form(req, res) {
    if (!req.session.user) return res.redirect('/minha-conta/login');
    const tickets = await Support.byUser(req.session.user.id);
    res.render('support', { title: 'Suporte', tickets });
  },
  async create(req, res) {
    if (!req.session.user) return res.redirect('/minha-conta/login');
    const { assunto, mensagem } = req.body;
    await Support.create(req.session.user.id, assunto, mensagem);
    req.flash('success', 'Ticket enviado.');
    res.redirect('/suporte');
  }
};
