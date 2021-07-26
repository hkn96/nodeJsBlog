const express = require('express');
const router = express.Router();
const Blog = require('../models/blogs');

router.get('/blog', (req, res) => {
  Blog.find()
    .sort({ createdAt: 1 })
    .then(result => {
      res.render('index', { title: 'Home Page', blogs: result });
    })
    .catch(err => {
      console.log(chalk.blue(err));
    });
});

router.get('/blog/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('blog', { blog: result, title: 'info' });
    })
    .catch(err => {
      res.status(404).render('404', { title: 'Error' });
    });
});

module.exports = router;
