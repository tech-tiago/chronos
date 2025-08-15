const Community = require('../models/Community');
module.exports = {
  async list(req, res) {
    const posts = await Community.all();
    res.render('community', { title: 'Comunidade', posts });
  },
  async show(req, res) {
    const post = await Community.find(req.params.id);
    if (!post) return res.redirect('/comunidade');
    const comments = await Community.comments(req.params.id);
    res.render('community', { title: post.titulo, posts: [post], comments });
  },
  async comment(req, res) {
    const { id } = req.params;
    const { mensagem } = req.body;
    const autor = (req.session.user && req.session.user.username) || 'Visitante';
    await Community.comment(id, autor, mensagem);
    res.redirect(`/comunidade/${id}`);
  }
};
