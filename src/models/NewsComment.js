// src/models/NewsComment.js
const db = require('../config/db');

module.exports = {
  // Cria um novo comentário
  async create(newsId, userId, content, parentId = null) {
    const [result] = await db.query(
      'INSERT INTO news_comments (news_id, user_id, parent_id, content) VALUES (?, ?, ?, ?)',
      [newsId, userId, parentId, content]
    );
    return result.insertId;
  },

  // Busca todos os comentários APROVADOS de uma notícia
  async findByNewsId(newsId) {
    const [rows] = await db.query(`
      SELECT nc.*, u.username 
      FROM news_comments nc
      JOIN users u ON nc.user_id = u.id
      WHERE nc.news_id = ? AND nc.status = 'approved'
      ORDER BY nc.created_at ASC
    `, [newsId]);
    return rows;
  },

  // Busca TODOS os comentários de uma notícia, para moderação do admin na página da notícia
  async findAllByNewsIdForAdmin(newsId) {
    const [rows] = await db.query(`
      SELECT nc.*, u.username 
      FROM news_comments nc
      JOIN users u ON nc.user_id = u.id
      WHERE nc.news_id = ?
      ORDER BY nc.created_at DESC
    `, [newsId]);
    return rows;
  },

  async findAllPending() {
    const [rows] = await db.query(`
      SELECT nc.id, nc.content, nc.created_at, nc.news_id as post_id,
             u.username as author,
             n.titulo as post_title
      FROM news_comments nc
      LEFT JOIN users u ON nc.user_id = u.id
      LEFT JOIN news n ON nc.news_id = n.id
      WHERE nc.status = 'pending'
      ORDER BY nc.created_at ASC
    `);
    return rows;
  },

  // Deleta um comentário
  async destroy(id) {
    await db.query('DELETE FROM news_comments WHERE id = ?', [id]);
  },

  // Atualiza o status de um comentário (aprovar/rejeitar)
  async updateStatus(id, status) {
    await db.query("UPDATE news_comments SET status = ? WHERE id = ?", [status, id]);
  }
};