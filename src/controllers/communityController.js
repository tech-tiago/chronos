const CommunityPost = require('../models/CommunityPost');
const CommunityComment = require('../models/CommunityComment');
const Like = require('../models/Like');

module.exports = {
  // Para a página principal da comunidade (formato de fórum)
  async list(req, res) {
    const allPosts = await CommunityPost.all(0, 20); // Pega os últimos 20 posts
    const latestPost = allPosts.shift(); // Remove o primeiro post para destacá-lo
    
    res.render('community', {
      title: 'Comunidade',
      latestPost, // O post mais recente, para o destaque
      posts: allPosts // O resto dos posts, para a lista
    });
  },

  async show(req, res) {
    try {
      const postId = parseInt(req.params.id);
      const userId = req.session.user ? req.session.user.id : null;

      const post = await CommunityPost.find(postId);
      if (!post) return res.redirect('/comunidade');

      const comments = await CommunityComment.findByPostId(postId);
      const commentIds = comments.map(c => c.id);

      const [postLikeCounts, commentLikeCounts, userPostLikes, userCommentLikes] = await Promise.all([
        Like.getCountsForItems('community_post', [postId]),
        Like.getCountsForItems('community_comment', commentIds),
        Like.getUserLikesForItems(userId, 'community_post', [postId]),
        Like.getUserLikesForItems(userId, 'community_comment', commentIds)
      ]);

      post.likeCount = postLikeCounts.get(post.id) || 0;
      post.currentUserHasLiked = userPostLikes.has(post.id);

      comments.forEach(comment => {
        comment.likeCount = commentLikeCounts.get(comment.id) || 0;
        comment.currentUserHasLiked = userCommentLikes.has(comment.id);
      });

      res.render('community-detail', {
        title: post.titulo,
        post,
        comments
      });
    } catch (error) {
      console.error("Erro ao exibir post da comunidade:", error);
      res.redirect('/comunidade');
    }
  },

  // Para adicionar comentários e respostas
  async addComment(req, res) {
    const { id } = req.params; // ID do Post
    const { content, parentId } = req.body;
    const userId = req.session.user ? req.session.user.id : null;

    if (!userId) {
      req.flash('error', 'Você precisa estar logado para comentar.');
      return res.redirect(`/comunidade/${id}`);
    }

    try {
      // A chamada para o model já envia o userId corretamente.
      await CommunityComment.create(id, userId, content, parentId || null);
      req.flash('success', 'Seu comentário foi publicado!');
    } catch (error) {
      req.flash('error', 'Ocorreu um erro ao enviar seu comentário.');
    } finally {
      res.redirect(`/comunidade/${id}`);
    }
  },
};