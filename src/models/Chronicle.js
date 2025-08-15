const db = require('../config/db');
module.exports = {
  async byCategory(cat) {
    const [rows] = await db.query('SELECT * FROM chronicles WHERE categoria=? ORDER BY publicado_em DESC', [cat]);
    return rows;
  },
  async all() {
    const [rows] = await db.query('SELECT * FROM chronicles ORDER BY publicado_em DESC');
    return rows;
  }
};
