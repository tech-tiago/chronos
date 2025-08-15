const SupportTicket = require('../../models/SupportTicket');

module.exports = {
  async list(req, res) {
    const tickets = await SupportTicket.findAll();
    res.render('admin/support/index', { 
        layout: 'layouts/admin', 
        title: 'Tickets de Suporte', 
        tickets 
    });
  },
  async view(req, res) {
    const ticket = await SupportTicket.findById(req.params.id);
    res.render('admin/support/view', { layout: 'layouts/admin', title: `Ticket #${ticket.id}`, ticket });
  },
  async reply(req, res) {
    const { id } = req.params;
    const { admin_response } = req.body;
    const adminId = req.session.user.id;
    await SupportTicket.reply(id, adminId, admin_response);
    req.flash('success', 'Ticket respondido e fechado com sucesso.');
    res.redirect('/admin/suporte');
  }
};