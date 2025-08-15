const Chronicle = require('../models/Chronicle');
module.exports = {
  async list(req, res) {
    const items = await Chronicle.all();
    res.render('chronicles', { title: 'Crônicas', items });
  }
};
