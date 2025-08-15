const db = require('../config/db');
module.exports = {
  async all() {
    const [rows] = await db.query('SELECT * FROM shop_items ORDER BY id DESC');
    return rows;
  },
  async find(id) {
    const [rows] = await db.query('SELECT * FROM shop_items WHERE id=?', [id]);
    return rows[0];
  },
  async create(data) {
    // Preço deve ser armazenado em centavos (inteiro) para evitar problemas de arredondamento
    const { nome, descricao, preco, imagem_url, tipo_item } = data;
    const [result] = await db.query(
      'INSERT INTO shop_items (nome, descricao, preco, imagem_url, tipo_item) VALUES (?, ?, ?, ?, ?)',
      [nome, descricao, parseInt(preco * 100), imagem_url, tipo_item]
    );
    return result.insertId;
  },
  async update(id, data) {
    const { nome, descricao, preco, imagem_url, tipo_item } = data;
    await db.query(
      'UPDATE shop_items SET nome=?, descricao=?, preco=?, imagem_url=?, tipo_item=? WHERE id=?',
      [nome, descricao, parseInt(preco * 100), imagem_url, tipo_item, id]
    );
  },
  async destroy(id) {
    await db.query('DELETE FROM shop_items WHERE id=?', [id]);
  }
};