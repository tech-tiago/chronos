const News = require('../models/News');

module.exports = {
  async list(req, res) {
    const items = await News.all();
    res.render('news', { title: 'Notícias', items });
  },
  async show(req, res) {
    const item = await News.find(req.params.id);
    if (!item) return res.redirect('/noticias');
    res.render('news', { title: item.titulo, items: [item] });
  }
};
