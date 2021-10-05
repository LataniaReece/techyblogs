const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({storage});
const User = require('../models/user');
const users = require('../controllers/users');
// const {isUserProfile, isLoggedIn } = require('../middleware')

router.route('/register')
    .post(users.register)

router.route('/login')
    .post(users.login)

router.get('/logout', users.logout)

router.route('/:id')
    .get(users.getUserById)
    .put(upload.single('image'), users.updateUser)
    .delete(users.deleteUser)

// router.get('/profile/:id/edit', isLoggedIn, isUserProfile, catchAsync(users.renderEditForm))

module.exports = router;