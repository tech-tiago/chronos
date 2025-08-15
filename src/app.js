
const path = require('path');
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');

const indexRoutes = require('./routes/indexRoutes');
const newsRoutes = require('./routes/newsRoutes');
const chroniclesRoutes = require('./routes/chroniclesRoutes');
const rankingsRoutes = require('./routes/rankingsRoutes');
const shopRoutes = require('./routes/shopRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const accountRoutes = require('./routes/accountRoutes');
const supportRoutes = require('./routes/supportRoutes');
const communityRoutes = require('./routes/communityRoutes');
const adminRoutes = require('./routes/admin/index');
const ensureAdmin = require('./middleware/ensureAdmin');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(expressLayouts);
app.set('layout', 'layouts/main');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use('/public', express.static(path.join(__dirname, '..', 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET || 'uma-chave-secreta-muito-forte',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

app.use(flash());

app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

app.use('/', indexRoutes);
app.use('/noticias', newsRoutes);
app.use('/cronicas', chroniclesRoutes);
app.use('/rankings', rankingsRoutes);
app.use('/loja', shopRoutes);
app.use('/galeria', galleryRoutes);
app.use('/minha-conta', accountRoutes);
app.use('/suporte', supportRoutes);
app.use('/comunidade', communityRoutes);
app.use('/admin', ensureAdmin, adminRoutes);

app.use((req, res, next) => {
  res.status(404).send("Desculpe, a página que você procura não foi encontrada.");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado no servidor!');
});

module.exports = app;