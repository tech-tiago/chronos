const db = require('../config/db');
module.exports = {
  async all() {
    const [rows] = await db.query('SELECT * FROM gallery ORDER BY publicado_em DESC');
    return rows;
  }
};
