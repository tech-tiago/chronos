const News = require('../models/News');

const CommunityPost = require('../models/CommunityPost');

module.exports = {
  async home(req, res) {
    try {
      const latestNews = await News.latest(4);
      
      const communityLatest = await CommunityPost.latest(3);
      
      res.render('index', {
        title: 'A Lenda de Chronos',
        latestNews,
        communityLatest
      });
    } catch (error) {
      console.error("Erro ao carregar a página inicial:", error);
      res.render('index', {
        title: 'A Lenda de Chronos',
        latestNews: [],
        communityLatest: []
      });
    }
  }
};