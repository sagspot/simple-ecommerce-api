const router = require('express').Router();
const ordersController = require('./orderController');
const checkAuth = require('../middlewares/auth');

// Add auth to all

router.get('/', ordersController.orders_get_all);
router.post('/', ordersController.orders_post_create);
router.get('/:orderId', ordersController.orders_get_product);
router.delete('/:orderId', ordersController.orders_delete_product);

module.exports = router;
