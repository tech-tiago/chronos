const News = require('../models/News');
const NewsComment = require('../models/NewsComment');
const Like = require('../models/Like');

module.exports = {
  // Mostra a lista de todas as notícias
  async list(req, res) {
    try {
      const items = await News.all();
      res.render('news', { title: 'Notícias', items });
    } catch (error) {
      console.error("Erro ao listar notícias:", error);
      res.redirect('/');
    }
  },

  // Mostra uma notícia completa e seus comentários
  async show(req, res) {
    try {
      const newsId = parseInt(req.params.id);
      const userId = req.session.user ? req.session.user.id : null;

      // 1. Buscar dados principais (notícia e comentários)
      const newsItem = await News.find(newsId);
      if (!newsItem) {
        return res.redirect('/noticias');
      }
      // Se o usuário for admin, busca todos os comentários, senão, só os aprovados
      const comments = (req.session.user && req.session.user.role === 'admin') 
          ? await NewsComment.findAllByNewsIdForAdmin(newsId)
          : await NewsComment.findByNewsId(newsId);
      
      // 2. Preparar para buscar dados de likes
      const commentIds = comments.map(c => c.id);

      // 3. Buscar todos os dados de likes em paralelo (otimização)
      const [
        newsLikeCountsMap,      // Mapa de contagem de likes para a notícia
        commentLikeCountsMap,   // Mapa de contagem de likes para os comentários
        userNewsLikesSet,       // Conjunto de IDs de notícias que o usuário curtiu
        userCommentLikesSet     // Conjunto de IDs de comentários que o usuário curtiu
      ] = await Promise.all([
        Like.getCountsForItems('news', [newsId]),
        Like.getCountsForItems('comment', commentIds),
        Like.getUserLikesForItems(userId, 'news', [newsId]),
        Like.getUserLikesForItems(userId, 'comment', commentIds)
      ]);

      // 4. Enriquecer o objeto da notícia com os dados de like
      newsItem.likeCount = newsLikeCountsMap.get(newsItem.id) || 0;
      newsItem.currentUserHasLiked = userNewsLikesSet.has(newsItem.id);

      // 5. Enriquecer cada objeto de comentário com os dados de like
      comments.forEach(comment => {
        comment.likeCount = commentLikeCountsMap.get(comment.id) || 0;
        comment.currentUserHasLiked = userCommentLikesSet.has(comment.id);
      });

      // 6. Renderizar a view com os dados completos
      res.render('news-detail', {
        title: newsItem.titulo,
        newsItem,
        comments
      });
    } catch (error) {
      console.error("Erro ao exibir notícia:", error);
      res.redirect('/noticias');
    }
  },

  // Adiciona um novo comentário
  async addComment(req, res) {
    const { id } = req.params; // ID da notícia
    const { content, parentId } = req.body;

    // ✅ CORREÇÃO APLICADA AQUI
    // Verificamos não apenas se 'user' existe, mas também se ele tem um 'id'.
    // Isso torna a verificação mais segura e previne o erro.
    if (!req.session.user || !req.session.user.id) {
      req.flash('error', 'Você precisa estar logado para comentar.');
      return res.redirect(`/noticias/${id}`);
    }

    const userId = req.session.user.id;

    try {
      if (!content) {
        req.flash('error', 'O comentário não pode estar vazio.');
        return res.redirect(`/noticias/${id}`);
      }

      await NewsComment.create(id, userId, content, parentId || null);
      req.flash('success', 'Seu comentário foi enviado e aguarda moderação.');
    } catch (error) {
      console.error("Erro ao adicionar comentário:", error);
      req.flash('error', 'Ocorreu um erro ao enviar seu comentário.');
    } finally {
      res.redirect(`/noticias/${id}`);
    }
  }
};