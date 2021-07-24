const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: 'string',
      require: true,
    },
    short: {
      type: 'string',
      require: true,
    },
    long: {
      type: 'string',
      require: true,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
