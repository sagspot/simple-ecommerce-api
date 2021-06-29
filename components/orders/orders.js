import express from 'express';

import {
  orders_get_all,
  orders_post_create,
  orders_get_order,
  orders_patch_order,
  orders_delete,
} from './orderController.js';
import checkAuth from '../middlewares/auth.js';

const router = express.Router();

// Add auth to all

router.get('/', checkAuth, orders_get_all);
router.post('/', checkAuth, orders_post_create);
router.get('/:orderId', checkAuth, orders_get_order);
router.patch('/:orderId', checkAuth, orders_patch_order);
router.delete('/:orderId', checkAuth, orders_delete);

export default router;
