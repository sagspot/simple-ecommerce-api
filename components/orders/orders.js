const router = require('express').Router();
const ordersController = require('./orderController');
const checkAuth = require('../middlewares/auth');

// Add auth to all

router.get('/', checkAuth, ordersController.orders_get_all);
router.post('/', checkAuth, ordersController.orders_post_create);
router.get('/:orderId', checkAuth, ordersController.orders_get_order);
router.patch('/:orderId', checkAuth, ordersController.orders_patch_order);
router.delete('/:orderId', checkAuth, ordersController.orders_delete);

module.exports = router;
