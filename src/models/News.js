const db = require('../config/db');

module.exports = {
  async latest(limit = 6) {
    const [rows] = await db.query('SELECT * FROM news ORDER BY data_publicacao DESC LIMIT ?', [limit]);
    return rows;
  },
  
  async all() {
    const [rows] = await db.query('SELECT * FROM news ORDER BY data_publicacao DESC');
    return rows;
  },
  
  async find(id) {
    const [rows] = await db.query('SELECT * FROM news WHERE id=?', [id]);
    return rows[0];
  },


  async create(data) {
    const { titulo, resumo, conteudo, imagem_url, categoria } = data;
    const [result] = await db.query(
      'INSERT INTO news (titulo, resumo, conteudo, imagem_url, categoria, data_publicacao) VALUES (?, ?, ?, ?, ?, NOW())',
      [titulo, resumo, conteudo, imagem_url, categoria]
    );
    return result.insertId;
  },

  async update(id, data) {
    const { titulo, resumo, conteudo, imagem_url, categoria } = data;
    const [result] = await db.query(
      'UPDATE news SET titulo = ?, resumo = ?, conteudo = ?, imagem_url = ?, categoria = ? WHERE id = ?',
      [titulo, resumo, conteudo, imagem_url, categoria, id]
    );
    return result.affectedRows;
  },

  async destroy(id) {
    const [result] = await db.query('DELETE FROM news WHERE id = ?', [id]);
    return result.affectedRows;
  }
};