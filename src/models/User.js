// src/models/User.js
const db = require('../config/db');

module.exports = {
  async create({ username, email, senha_hash }) {
    const [result] = await db.query(
      "INSERT INTO users (username, email, senha_hash, role, status, criado_em) VALUES (?, ?, ?, 'user', 'ativo', NOW())", 
      [username, email, senha_hash]
    );
    return result.insertId;
  },

  async findByUsername(username) {
    const [rows] = await db.query('SELECT * FROM users WHERE username=?', [username]);
    return rows[0];
  },

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM users WHERE id=?', [id]);
    return rows[0];
  },
  
  // Métodos que adicionamos para o admin (manter)
  async findAll() {
    const [rows] = await db.query('SELECT id, username, email, role, status, criado_em FROM users ORDER BY id DESC');
    return rows;
  },
  
  async updateStatus(id, status) {
    await db.query("UPDATE users SET status=? WHERE id=?", [status, id]);
  }
};