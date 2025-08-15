// src/models/Chronicle.js
const db = require('../config/db');

module.exports = {
  async byCategory(cat) {
    const [rows] = await db.query('SELECT * FROM chronicles WHERE categoria=? ORDER BY publicado_em DESC', [cat]);
    return rows; // Retorna a lista de crônicas por categoria
  },

  async all() {
    const [rows] = await db.query('SELECT * FROM chronicles ORDER BY publicado_em DESC');
    return rows; // Retorna a lista com TODAS as crônicas
  },

  async find(id) {
    const [rows] = await db.query('SELECT * FROM chronicles WHERE id=?', [id]);
    return rows[0];
  },
  
  async create(data) {
    const { titulo, categoria, conteudo, capa_url } = data;
    const [result] = await db.query(
      'INSERT INTO chronicles (titulo, categoria, conteudo, capa_url, publicado_em) VALUES (?, ?, ?, ?, NOW())',
      [titulo, categoria, conteudo, capa_url]
    );
    return result.insertId;
  },

  async update(id, data) {
    const { titulo, categoria, conteudo, capa_url } = data;
    await db.query(
      'UPDATE chronicles SET titulo = ?, categoria = ?, conteudo = ?, capa_url = ? WHERE id = ?',
      [titulo, categoria, conteudo, capa_url, id]
    );
    // Funções de update não precisam necessariamente retornar algo, mas poderiam retornar affectedRows
  },

  async destroy(id) {
    await db.query('DELETE FROM chronicles WHERE id = ?', [id]);
  }
};