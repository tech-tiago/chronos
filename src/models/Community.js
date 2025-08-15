const db = require('../config/db');
module.exports = {
  async latest(limit=4) {
    const [rows] = await db.query('SELECT * FROM community_posts ORDER BY publicado_em DESC LIMIT ?', [limit]);
    return rows;
  },
  async all() {
    const [rows] = await db.query('SELECT * FROM community_posts ORDER BY publicado_em DESC');
    return rows;
  },
  async find(id) {
    const [rows] = await db.query('SELECT * FROM community_posts WHERE id=?',[id]);
    return rows[0];
  },
  async comments(postId) {
    const [rows] = await db.query('SELECT * FROM community_comments WHERE post_id=? ORDER BY publicado_em ASC',[postId]);
    return rows;
  },
  async comment(postId, autor, mensagem) {
    await db.query('INSERT INTO community_comments (post_id, autor, mensagem) VALUES (?,?,?)',[postId, autor, mensagem]);
  }
};
