const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const {isUserProfile, isLoggedIn, validateNewUser, validateUpdatedUser } = require('../middleware')

router.route('/register')
    .post(validateNewUser, users.register)

router.route('/login')
    .post(users.login)

router.get('/logout', users.logout)

router.route('/:id')
    .get(users.getUserById)
    .put(isLoggedIn, isUserProfile, validateUpdatedUser, users.updateUser)
    .delete(isLoggedIn, isUserProfile, users.deleteUser)

module.exports = router;