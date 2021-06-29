import express from 'express';

import {
  products_get_all,
  products_post_create,
  products_get_product,
  products_patch_product,
  products_delete_product,
} from './productController.js';
import checkAuth from '../middlewares/auth.js';

const router = express.Router();

router.get('/', products_get_all);
router.post('/', checkAuth, products_post_create); // add checkAuth
router.get('/:productId', products_get_product);
router.patch('/:productId', checkAuth, products_patch_product);
router.delete('/:productId', checkAuth, products_delete_product);

export default router;
