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
  }
};
