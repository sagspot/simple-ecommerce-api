const router = require('express').Router();
const productsController = require('./productController');
const checkAuth = require('../middlewares/auth');

router.get('/', productsController.products_get_all);
router.post('/', checkAuth, productsController.products_post_create); // add checkAuth
router.get('/:productId', productsController.products_get_product);
router.patch(
  '/:productId',
  checkAuth,
  productsController.products_patch_product
);
router.delete(
  '/:productId',
  checkAuth,
  productsController.products_delete_product
);

module.exports = router;
