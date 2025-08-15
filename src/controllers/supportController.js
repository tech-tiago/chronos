const Support = require('../models/SupportTicket');

module.exports = {
  // Esta função mostra o formulário e os tickets existentes do usuário
  async form(req, res) {
    if (!req.session.user) return res.redirect('/minha-conta/login');
    const tickets = await Support.byUser(req.session.user.id);
    res.render('support', { title: 'Suporte', tickets });
  },

  // Esta função CRIA o novo ticket
  async create(req, res) {
    // 1. Garante que o usuário está logado
    if (!req.session.user) return res.redirect('/minha-conta/login');
    
    // 2. Pega os dados do formulário
    const { assunto, mensagem } = req.body;
    
    // 3. Pega o ID do usuário da sessão
    const userId = req.session.user.id;
    
    try {
      // 4. Chama o model para criar o ticket no banco de dados
      await Support.create(userId, assunto, mensagem);
      req.flash('success', 'Ticket de suporte enviado com sucesso.');
    } catch (error) {
      console.error("Erro ao criar ticket:", error);
      req.flash('error', 'Ocorreu um erro ao enviar seu ticket. Tente novamente.');
    } finally {
      // 5. Redireciona de volta para a página de suporte
      res.redirect('/suporte');
    }
  }
};