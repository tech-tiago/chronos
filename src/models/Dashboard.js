const db = require('../config/db');

module.exports = {
  async getStats() {
    // Usamos Promise.all para rodar todas as consultas em paralelo
    const [
      [newUsers],
      [openTickets],
      [latestNews],
      [latestChronicles]
    ] = await Promise.all([
      db.query("SELECT COUNT(*) as count FROM users WHERE criado_em >= NOW() - INTERVAL 1 WEEK"),
      db.query("SELECT COUNT(*) as count FROM support_tickets WHERE status = 'Aberto'"),
      db.query("SELECT id, titulo FROM news ORDER BY data_publicacao DESC LIMIT 5"),
      db.query("SELECT id, titulo FROM chronicles ORDER BY publicado_em DESC LIMIT 5")
    ]);

    // O ideal para "itens mais vendidos" seria uma tabela de 'pedidos' ou 'transacoes'.
    // Como não temos, vamos mockar por enquanto.
    const bestSellers = [
      { nome: 'Pacote VIP Mensal', vendas: 150 },
      { nome: '1000 Diamantes', vendas: 120 }
    ];

    return {
      newUsers: newUsers.count,
      openTickets: openTickets.count,
      latestNews,
      latestChronicles,
      bestSellers
    };
  }
};