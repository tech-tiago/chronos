const Community = require('../models/Community');

module.exports = {
  // Mostra a lista de todos os posts
  async list(req, res) {
    try {
      const posts = await Community.all();
      res.render('community', { 
        title: 'Comunidade', 
        posts, 
        comments: null 
      });
    } catch (error) {
      console.error("Erro ao listar posts da comunidade:", error);
      // Lidar com o erro
    }
  },

  // Mostra um post específico com seus comentários
  async show(req, res) {
    try {
      const post = await Community.find(req.params.id);
      if (!post) return res.redirect('/comunidade');

      const comments = await Community.comments(req.params.id);
      // Aqui 'comments' é um array com os comentários, e a view funcionará corretamente.
      res.render('community', { 
        title: post.titulo, 
        posts: [post], // A view espera um array de posts
        comments 
      });
    } catch (error) {
      console.error("Erro ao mostrar post da comunidade:", error);
      // Lidar com o erro
    }
  },

  // Adiciona um novo comentário
  async comment(req, res) {
    try {
      const { id } = req.params;
      const { mensagem } = req.body;
      const autor = (req.session.user && req.session.user.username) || 'Visitante';
      await Community.comment(id, autor, mensagem);
      res.redirect(`/comunidade/${id}`);
    } catch (error) {
      console.error("Erro ao comentar em post:", error);
      // Lidar com o erro
    }
  }
};