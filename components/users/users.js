const router = require('express').Router();
const usersController = require('./userController');
const checkAuth = require('../middlewares/auth');

router.get('/', usersController.users_get_all);
router.post('/register', usersController.users_post_register);
router.post('/login', usersController.users_post_login);
router.delete('/', checkAuth, usersController.users_delete);

module.exports = router;
