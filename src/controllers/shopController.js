const ShopItem = require('../models/ShopItem');
module.exports = {
  async list(req, res) {
    const items = await ShopItem.all();
    res.render('shop', { title: 'Loja', items });
  }
};
