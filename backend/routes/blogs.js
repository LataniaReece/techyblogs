const express = require('express');
const router = express.Router();
const blogs = require('../controllers/blogs');
const { isLoggedIn } = require('../middleware');

router.route('/')
    .get(blogs.getBlogs)
    .post(isLoggedIn, blogs.createBlog)

router.route('/:id')
    .get(blogs.getBlogById)
    .put(isLoggedIn, blogs.updateBlog)
    .delete(isLoggedIn, blogs.deleteBlog)

module.exports = router;
