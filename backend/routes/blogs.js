const express = require('express');
const router = express.Router();
const blogs = require('../controllers/blogs');
const { isLoggedIn } = require('../middleware');

router.route('/')
    .get(blogs.getBlogs)
    .post(blogs.createBlog)

router.route('/:id')
    .get(blogs.getBlogById)
    .put(blogs.updateBlog)
    .delete(blogs.deleteBlog)

module.exports = router;
