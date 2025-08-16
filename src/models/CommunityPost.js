const db = require('../config/db');
module.exports = {
  async latest(limit = 1) {
    const [rows] = await db.query('SELECT * FROM community_posts ORDER BY publicado_em DESC LIMIT ?', [limit]);
    return rows;
  },
  async all(offset = 0, limit = 10) {
    const [rows] = await db.query('SELECT * FROM community_posts ORDER BY publicado_em DESC LIMIT ?, ?', [offset, limit]);
    return rows;
  },
  async find(id) {
    const [rows] = await db.query('SELECT * FROM community_posts WHERE id=?', [id]);
    return rows[0];
  }
};