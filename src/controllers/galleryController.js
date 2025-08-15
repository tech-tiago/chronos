const Gallery = require('../models/Gallery');
module.exports = {
  async list(req, res) {
    const items = await Gallery.all();
    res.render('gallery', { title: 'Galeria', items });
  }
};
