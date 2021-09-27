const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({storage});
const blogs = require('../controllers/blogs');
const { isLoggedIn } = require('../middleware');

router.route('/')
    .get(blogs.getBlogs)
    .post(isLoggedIn, upload.single('image'), blogs.createBlog)

router.route('/:id')
    .get(blogs.getBlogById)
    .put(upload.single('image'), blogs.updateBlog)
    .delete(blogs.deleteBlog)

module.exports = router;
