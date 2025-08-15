const db = require('../config/db');
module.exports = {
  async topHeroes(limit=10) {
    const [rows] = await db.query(
      'SELECT * FROM characters ORDER BY level DESC, pve_score DESC LIMIT ?', [limit]
    );
    return rows;
  },
  async topPvP(limit=10) {
    const [rows] = await db.query(
      'SELECT * FROM characters ORDER BY pvp_kills DESC, level DESC LIMIT ?', [limit]
    );
    return rows;
  },
  async guildRanking(limit=10) {
    const [rows] = await db.query(
      `SELECT guilda, COUNT(*) as membros, SUM(level) as poder
       FROM characters WHERE guilda IS NOT NULL AND guilda<>''
       GROUP BY guilda ORDER BY poder DESC LIMIT ?`, [limit]
    );
    return rows;
  },
  async findByUser(userId) {
    const [rows] = await db.query('SELECT * FROM characters WHERE user_id=?', [userId]);
    return rows;
  },
  async findWithItemsByName(nome) {
    const [charRows] = await db.query('SELECT * FROM characters WHERE nome=?',[nome]);
    const c = charRows[0];
    if (!c) return null;
    const [items] = await db.query(`
      SELECT i.* , ci.equipado FROM items i
      JOIN character_items ci ON ci.item_id=i.id
      WHERE ci.character_id=?`, [c.id]);
    c.itens = items;
    return c;
  }
};
