const db = require('../config/db');
module.exports = {
  async create({ username, email, senha_hash }) {
    const [r] = await db.query('INSERT INTO users (username, email, senha_hash) VALUES (?,?,?)', [username, email, senha_hash]);
    return r.insertId;
  },
  async findByUsername(username) {
    const [rows] = await db.query('SELECT * FROM users WHERE username=?', [username]);
    return rows[0];
  },
  async findById(id) {
    const [rows] = await db.query('SELECT * FROM users WHERE id=?', [id]);
    return rows[0];
  }
};
