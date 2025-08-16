const NewsComment = require('../../models/NewsComment');

module.exports = {
  // Lista todos os comentários pendentes
  async listPending(req, res) {
    try {
      const comments = await NewsComment.findAllPending();
      res.render('admin/comments/index', {
        layout: 'layouts/admin',
        title: 'Moderar Comentários',
        comments
      });
    } catch (error) {
      console.error("Erro ao listar comentários pendentes:", error);
      req.flash('error', 'Não foi possível carregar os comentários.');
      res.redirect('/admin');
    }
  },

  // Aprova um comentário
  async approve(req, res) {
    try {
      await NewsComment.updateStatus(req.params.id, 'approved');
      req.flash('success', 'Comentário aprovado com sucesso!');
    } catch (e) {
      req.flash('error', 'Erro ao aprovar comentário.');
    }
    res.redirect('back'); // Redireciona para a página de onde veio
  },

  // Deleta um comentário
  async destroy(req, res) {
    try {
      await NewsComment.destroy(req.params.id);
      req.flash('success', 'Comentário deletado com sucesso!');
    } catch (e) {
      req.flash('error', 'Erro ao deletar comentário.');
    }
    res.redirect('back');
  }
};