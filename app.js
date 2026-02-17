const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.redirect('/register');
});

app.use('/', authRoutes);

app.get('/login', (req, res) => {
  res.send('Login page - to be implemented');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
