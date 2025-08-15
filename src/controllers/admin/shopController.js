const ShopItem = require('../../models/ShopItem');

module.exports = {
  // Lista todos os itens da loja
  async list(req, res) {
    const items = await ShopItem.all();
    res.render('admin/shop/index', {
      layout: 'layouts/admin',
      title: 'Gerenciar Loja',
      items
    });
  },

  // Mostra o formulário de criação/edição
  async showForm(req, res) {
    let item = {};
    if (req.params.id) {
      item = await ShopItem.find(req.params.id);
      // Converte o preço de centavos para reais para exibir no formulário
      if (item) item.preco = item.preco / 100;
    }
    res.render('admin/shop/form', {
      layout: 'layouts/admin',
      title: req.params.id ? 'Editar Item' : 'Novo Item na Loja',
      item
    });
  },

  // Processa a criação de um novo item
  async create(req, res) {
    await ShopItem.create(req.body);
    req.flash('success', 'Item criado com sucesso!');
    res.redirect('/admin/loja');
  },

  // Processa a atualização de um item
  async update(req, res) {
    await ShopItem.update(req.params.id, req.body);
    req.flash('success', 'Item atualizado com sucesso!');
    res.redirect('/admin/loja');
  },

  // Deleta um item
  async destroy(req, res) {
    await ShopItem.destroy(req.params.id);
    req.flash('success', 'Item deletado com sucesso!');
    res.redirect('/admin/loja');
  }
};