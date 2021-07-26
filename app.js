const express = require('express');
const chalk = require('chalk');
const adminRoutes = require('./routes/adminRoutes');
const blogRoutes = require('./routes/blogRoutes');

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

// morgan import
const morgan = require('morgan');

// template engine ejs
app.set('view engine', 'ejs');

// statische seite
app.use(express.static('public'));

// expressbodyParser

app.use(express.urlencoded({ extended: true }));

// middleware
app.use(morgan('tiny'));

// admin routes use
app.use(adminRoutes);

// blog routes use
app.use(blogRoutes);

app.get('/', (req, res) => {
  res.redirect('/blog');
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
