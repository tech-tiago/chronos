const Chronicle = require('../../models/Chronicle');

module.exports = {
  // Lista todas as crônicas
  async list(req, res) {
    const chronicles = await Chronicle.all();
    res.render('admin/chronicles/index', {
      layout: 'layouts/admin',
      title: 'Gerenciar Crônicas',
      chronicles
    });
  },

  // Mostra o formulário de criação/edição
  async showForm(req, res) {
    let chronicleItem = {};
    if (req.params.id) {
      chronicleItem = await Chronicle.find(req.params.id);
    }
    res.render('admin/chronicles/form', {
      layout: 'layouts/admin',
      title: req.params.id ? 'Editar Crônica' : 'Nova Crônica',
      chronicle: chronicleItem
    });
  },

  // Processa a criação de uma nova crônica
  async create(req, res) {
    await Chronicle.create(req.body);
    req.flash('success', 'Crônica criada com sucesso!');
    res.redirect('/admin/cronicas');
  },

  // Processa a atualização de uma crônica
  async update(req, res) {
    await Chronicle.update(req.params.id, req.body);
    req.flash('success', 'Crônica atualizada com sucesso!');
    res.redirect('/admin/cronicas');
  },

  // Deleta uma crônica
  async destroy(req, res) {
    await Chronicle.destroy(req.params.id);
    req.flash('success', 'Crônica deletada com sucesso!');
    res.redirect('/admin/cronicas');
  }
};