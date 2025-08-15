const Character = require('../models/Character');
module.exports = {
  async list(req, res) {
    const heroes = await Character.topHeroes(10);
    const pvp = await Character.topPvP(10);
    const guilds = await Character.guildRanking(10);
    res.render('rankings', { title: 'Rankings', heroes, pvp, guilds });
  }
};
