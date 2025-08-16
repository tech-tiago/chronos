const NewsComment = require('../../models/NewsComment');
const CommunityComment = require('../../models/CommunityComment');

module.exports = {
  // Lista TODOS os comentários pendentes (de Notícias e Comunidade)
  async listPending(req, res) {
    try {
      // 1. Busca os comentários de ambas as fontes em paralelo
      const [newsComments, communityComments] = await Promise.all([
        NewsComment.findAllPending(),
        CommunityComment.findAllPending()
      ]);

      // 2. Adiciona um 'type' para sabermos a origem de cada comentário na view
      const newsCommentsWithType = newsComments.map(c => ({ ...c, type: 'news' }));
      const communityCommentsWithType = communityComments.map(c => ({ ...c, type: 'community' }));

      // 3. Combina e ordena todos por data de criação
      const allComments = [...newsCommentsWithType, ...communityCommentsWithType]
        .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      
      res.render('admin/comments/index', {
        layout: 'layouts/admin',
        title: 'Moderar Comentários',
        comments: allComments
      });
    } catch (error) {
      console.error("Erro ao listar comentários pendentes:", error);
      req.flash('error', 'Não foi possível carregar os comentários.');
      res.redirect('/admin');
    }
  },

  // Aprova um comentário (de qualquer tipo)
  async approve(req, res) {
    const { id } = req.params;
    const { type } = req.body; 
    
    try {
      if (type === 'news') {
        await NewsComment.updateStatus(id, 'approved');
      } else if (type === 'community') {
        await CommunityComment.updateStatus(id, 'approved');
      }
      req.flash('success', 'Comentário aprovado com sucesso!');
    } catch (e) {
      req.flash('error', 'Erro ao aprovar comentário.');
    }
    res.redirect('back');
  },


  async destroy(req, res) {
    const { id } = req.params;
    const { type } = req.body;

    try {
      if (type === 'news') {
        await NewsComment.destroy(id);
      } else if (type === 'community') {
        await CommunityComment.destroy(id);
      }
      req.flash('success', 'Comentário deletado com sucesso!');
    } catch (e) {
      req.flash('error', 'Erro ao deletar comentário.');
    }
    res.redirect('back');
  }
};