const News = require('../../models/News');

module.exports = {
  // Lista todas as notícias
  async list(req, res) {
    try {
      const news = await News.all();
      res.render('admin/news/index', {
        layout: 'layouts/admin',
        title: 'Gerenciar Notícias',
        news
      });
    } catch (error) {
      // Tratar erro
    }
  },

  // Mostra o formulário de criação/edição
  async showForm(req, res) {
    try {
      let newsItem = {};
      // Se houver um ID nos parâmetros, estamos editando. Busque a notícia.
      if (req.params.id) {
        newsItem = await News.find(req.params.id);
      }
      res.render('admin/news/form', {
        layout: 'layouts/admin',
        title: req.params.id ? 'Editar Notícia' : 'Nova Notícia',
        news: newsItem
      });
    } catch (error) {
      // Tratar erro
    }
  },

  // Processa a criação de uma nova notícia
  async create(req, res) {
    try {
      await News.create(req.body);
      req.flash('success', 'Notícia criada com sucesso!');
      res.redirect('/admin/noticias');
    } catch (error) {
      // Tratar erro
    }
  },

  // Processa a atualização de uma notícia
  async update(req, res) {
    try {
      await News.update(req.params.id, req.body);
      req.flash('success', 'Notícia atualizada com sucesso!');
      res.redirect('/admin/noticias');
    } catch (error) {
      // Tratar erro
    }
  },

  // Deleta uma notícia
  async destroy(req, res) {
    try {
      await News.destroy(req.params.id);
      req.flash('success', 'Notícia deletada com sucesso!');
      res.redirect('/admin/noticias');
    } catch (error) {
      // Tratar erro
    }
  }
};