const express = require('express');
const chalk = require('chalk');

const app = express();

// mongoDBmodel
const Blog = require('./models/blogs');

// mongoose
const mongoose = require('mongoose');
mongoose
  .connect('mongodb://localhost/NodeBlogDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

const morgan = require('morgan');

// template engine ejs
app.set('view engine', 'ejs');

// statische seite
app.use(express.static('public'));

// middleware
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  Blog.find()
    .sort({ createdAt: 1 })
    .then(result => {
      res.render('index', { title: 'Home Page', blogs: result });
    })
    .catch(err => {
      console.log(chalk.red(err));
    });
});

app.get('/blog/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('blog', { blog: result, title: 'info' });
    })
    .catch(err => {
      res.status(404).render('404', { title: 'Error' });
    });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About us' });
});

app.get('/about-us', (req, res) => {
  res.redirect('/about');
});

app.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

app.use((req, res) => {
  res.status(404).render('404', { title: 'Error' });
});
