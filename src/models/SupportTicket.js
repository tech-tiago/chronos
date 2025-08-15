// src/models/SupportTicket.js
const db = require('../config/db');

module.exports = {
  async create(userId, assunto, mensagem) {
    const [result] = await db.query(
      'INSERT INTO support_tickets (user_id, assunto, mensagem, criado_em) VALUES (?, ?, ?, NOW())',
      [userId, assunto, mensagem]
    );
    return result.insertId;
  },

  async byUser(userId) {
    const [rows] = await db.query(
      'SELECT * FROM support_tickets WHERE user_id=? ORDER BY criado_em DESC',
      [userId]
    );
    return rows;
  },

  // Novos métodos para o admin (estes já estavam corretos)
  async findAll() {
    const [rows] = await db.query(`
      SELECT st.*, u.username 
      FROM support_tickets st
      LEFT JOIN users u ON st.user_id = u.id
      ORDER BY st.criado_em DESC
    `);
    return rows;
  },
  
  async findById(id) {
    const [rows] = await db.query(`
      SELECT st.*, u.username, u.email 
      FROM support_tickets st
      LEFT JOIN users u ON st.user_id = u.id
      WHERE st.id = ?
    `, [id]);
    return rows[0];
  },
  
  async reply(id, adminId, response) {
    await db.query(
      "UPDATE support_tickets SET status='Fechado', admin_response=?, resolved_by=? WHERE id=?",
      [response, adminId, id]
    );
  }
};