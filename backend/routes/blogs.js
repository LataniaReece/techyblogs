const express = require('express');
const router = express.Router();
const blogs = require('../controllers/blogs');
const { isLoggedIn, isAuthor, validateBlog } = require('../middleware');

router.route('/')
    .get(blogs.getBlogs)
    .post(isLoggedIn, validateBlog, blogs.createBlog)

router.route('/:id')
    .get(blogs.getBlogById)
    .put(isLoggedIn, isAuthor, validateBlog, blogs.updateBlog)
    .delete(isLoggedIn, isAuthor, blogs.deleteBlog)

module.exports = router;
