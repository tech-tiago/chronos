const db = require('../config/db');

module.exports = {
  /**
   * Adiciona um like se não existir, ou remove se já existir.
   */
  async toggle(userId, likeableType, likeableId) {
    const [deleteResult] = await db.query(
      "DELETE FROM likes WHERE user_id = ? AND likeable_type = ? AND likeable_id = ?",
      [userId, likeableType, likeableId]
    );

    if (deleteResult.affectedRows === 0) {
      await db.query(
        "INSERT INTO likes (user_id, likeable_type, likeable_id) VALUES (?, ?, ?)",
        [userId, likeableType, likeableId]
      );
      return { action: 'liked' };
    }
    
    return { action: 'unliked' };
  },

  /**
   
   * Busca a contagem de likes para uma lista de IDs de um mesmo tipo.
   * @param {'news' | 'comment'} likeableType - O tipo de conteúdo.
   * @param {number[]} itemIds - Um array de IDs (ex: [10, 15, 22]).
   * @returns {Map<number, number>} Um mapa de ID do item para sua contagem de likes. Ex: { 10 => 5, 15 => 12 }
   */
  async getCountsForItems(likeableType, itemIds) {
    if (itemIds.length === 0) {
      return new Map();
    }
    const query = `
      SELECT likeable_id, COUNT(*) as count 
      FROM likes 
      WHERE likeable_type = ? AND likeable_id IN (?) 
      GROUP BY likeable_id
    `;
    const [rows] = await db.query(query, [likeableType, itemIds]);
    return new Map(rows.map(row => [row.likeable_id, row.count]));
  },

  /**
  
   * Verifica quais itens de uma lista um usuário específico já curtiu.
   * @param {number} userId - ID do usuário.
   * @param {'news' | 'comment'} likeableType - O tipo de conteúdo.
   * @param {number[]} itemIds - Um array de IDs.
   * @returns {Set<number>} Um conjunto de IDs que o usuário já curtiu. Ex: { 10, 22 }
   */
  async getUserLikesForItems(userId, likeableType, itemIds) {
    if (!userId || itemIds.length === 0) {
      return new Set();
    }
    const query = `
      SELECT likeable_id 
      FROM likes 
      WHERE user_id = ? AND likeable_type = ? AND likeable_id IN (?)
    `;
    const [rows] = await db.query(query, [userId, likeableType, itemIds]);
    return new Set(rows.map(row => row.likeable_id));
  }
};