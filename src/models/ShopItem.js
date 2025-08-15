const db = require('../config/db');
module.exports = {
  async all() {
    const [rows] = await db.query('SELECT * FROM shop_items ORDER BY id DESC');
    return rows;
  }
};
