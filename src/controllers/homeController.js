const News = require('../models/News');
const Community = require('../models/Community');

module.exports = {
  async home(req, res) {
    const latestNews = await News.latest(4);
    const communityLatest = await Community.latest(3);
    res.render('index', {
      title: 'A Lenda de Chronos',
      latestNews,
      communityLatest
    });
  }
};
