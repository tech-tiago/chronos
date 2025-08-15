const Dashboard = require('../../models/Dashboard');

module.exports = {
  async index(req, res) {
    try {
      const stats = await Dashboard.getStats();
      res.render('admin/dashboard', {
        layout: 'layouts/admin',
        title: 'Dashboard',
        stats
      });
    } catch (error) {
      console.error("Erro ao buscar estatísticas do dashboard:", error);
      res.render('admin/dashboard', { 
        layout: 'layouts/admin',
        title: 'Dashboard',
        stats: {}, // Envia objeto vazio em caso de erro
        error: "Não foi possível carregar as estatísticas."
      });
    }
  }
};