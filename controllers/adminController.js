const Blog = require('../models/blogs');

const admin_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: 1 })
    .then(result => {
      res.render('admin', { title: 'admin', blogs: result });
    })
    .catch(err => {
      console.log(chalk.red(err));
    });
};

const admin_add = (req, res) => {
  res.render('add', { title: 'New Content' });
};

const admin_add_post = (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then(result => {
      res.redirect('/admin');
    })
    .catch(err => {
      console.log(err);
    });
};

const admin_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id).then(result => {
    res.json({ link: '/admin' });
  });
};

module.exports = {
  admin_index,
  admin_add,
  admin_add_post,
  admin_delete,
};
