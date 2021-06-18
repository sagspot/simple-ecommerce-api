const router = require('express').Router();
const productsController = require('./productController');
const checkAuth = require('../middlewares/auth');

router.get('/', productsController.products_get_all);
router.post('/', productsController.products_post_create); // add checkAuth
router.get('/:productId', productsController.products_get_product);
router.patch('/:productId', productsController.products_patch_product); // add checkAuth
router.delete('/:productId', productsController.products_delete_product); // add checkAuth

module.exports = router;
