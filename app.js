const express = require('express');
const app = express();
app.listen(3000);

const morgan = require('morgan');

// template engine
app.set('view engine', 'ejs');

// statische seite
app.use(express.static('public'));

// middleware
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.render('index', { title: 'Home Page' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About us' });
});

app.get('/about-us', (req, res) => {
  res.redirect('/about');
});

app.use((req, res) => {
  res.status(404).render('404', { title: 'Error' });
});
