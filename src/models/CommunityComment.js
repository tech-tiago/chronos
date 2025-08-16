const db = require('../config/db');

module.exports = {

  async create(postId, userId, content, parentId = null) {
    const [result] = await db.query(
      'INSERT INTO community_comments (post_id, user_id, parent_id, mensagem) VALUES (?, ?, ?, ?)',
      [postId, userId, parentId, content]
    );
    return result.insertId;
  },


  async findByPostId(postId) {
    const [rows] = await db.query(`
      SELECT cc.*, u.username 
      FROM community_comments cc
      LEFT JOIN users u ON cc.user_id = u.id
      WHERE cc.post_id = ? AND cc.status = 'approved'
      ORDER BY cc.publicado_em ASC
    `, [postId]);
    return rows;
  },

  async findAllByPostIdForAdmin(postId) {
    const [rows] = await db.query(`
      SELECT cc.*, u.username 
      FROM community_comments cc
      LEFT JOIN users u ON cc.user_id = u.id
      WHERE cc.post_id = ?
      ORDER BY cc.publicado_em ASC
    `, [postId]);
    return rows;
  },

  async findAllPending() {
    const [rows] = await db.query(`
      SELECT cc.id, cc.mensagem as content, cc.publicado_em as created_at, cc.post_id,
             u.username as author,
             cp.titulo as post_title
      FROM community_comments cc
      JOIN users u ON cc.user_id = u.id
      JOIN community_posts cp ON cc.post_id = cp.id
      WHERE cc.status = 'pending'
      ORDER BY cc.publicado_em ASC
    `);
    return rows;
  },

  async updateStatus(id, status) {
    await db.query("UPDATE community_comments SET status = ? WHERE id = ?", [status, id]);
  },

  async destroy(id) {
    await db.query('DELETE FROM community_comments WHERE id = ?', [id]);
  }
};