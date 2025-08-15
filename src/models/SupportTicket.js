const db = require('../config/db');
module.exports = {
  async create(userId, assunto, mensagem) {
    await db.query('INSERT INTO support_tickets (user_id, assunto, mensagem) VALUES (?,?,?)',[userId, assunto, mensagem]);
  },
  async byUser(userId) {
    const [rows] = await db.query('SELECT * FROM support_tickets WHERE user_id=? ORDER BY criado_em DESC',[userId]);
    return rows;
  }
};
