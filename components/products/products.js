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

/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      required:
 *        - name
 *        - price
 *      properties:
 *        _id:
 *          type: string
 *          description: The auto-generated id of the product
 *        name:
 *          type: string
 *          description: The name of the product
 *        price:
 *          type: number
 *          description: The price of the product
 *        date:
 *          type: string
 *          description: The auto-generated date of product creation
 *      example:
 *        _id: 437ff7a5-a318-42bb-ab92-1142a9e7f518
 *        name: Accessories
 *        price: 2500
 *        date: 2021-06-20T12:51:46.974Z
 */

/**
 * @swagger
 * tags:
 *  name: Products
 *  description: Create, get and delete products from these routes. You can view all products or a single product without authentication. To add, update and delete a product however, you have to be authenticated
 */

router.get('/', products_get_all);
/**
 * @swagger
 * /products:
 *  get:
 *    summary: Return list of all products
 *    description: Fetch all products
 *    tags: [Products]
 *    responses:
 *      200:
 *        description: The list of all products
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Product'
 *      500:
 *        description: Something went wrong
 */

router.post('/', checkAuth, products_post_create);
/**
 * @swagger
 * /products:
 *  post:
 *    summary: Add new product
 *    tags: [Products]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: TV Stand
 *              price:
 *                type: number
 *                example: 2500
 *    responses:
 *      201:
 *        description: Product successfully added
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad request
 *      401:
 *        description: Authorization information is missing or invalid
 *      500:
 *        description: Something went wrong
 *
 */

router.get('/:productId', products_get_product);
/**
 * @swagger
 * /products/{productId}:
 *  get:
 *    summary: Get details of a product
 *    tags: [Products]
 *    parameters:
 *      - in: path
 *        name: productId
 *        schema:
 *          type: string
 *        required: true
 *        description: The product id
 *    responses:
 *      200:
 *        description: Product details
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad request. Invalid id
 *      404:
 *        description: Product not found
 *      500:
 *        description: Something went wrong
 *
 */

router.patch('/:productId', checkAuth, products_patch_product);
/**
 * @swagger
 * /products/{productId}:
 *  patch:
 *    summary: Update product
 *    tags: [Products]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: productId
 *        schema:
 *          type: string
 *        required: true
 *        description: The product id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Computer
 *              price:
 *                type: number
 *                example: 42500
 *    responses:
 *      200:
 *        description: Product updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad request. Invalid id
 *      404:
 *        description: Product not found
 *      500:
 *        description: Something went wrong
 *
 */

router.delete('/:productId', checkAuth, products_delete_product);
/**
 * @swagger
 * /products/{productId}:
 *  delete:
 *    summary: Delete product
 *    tags: [Products]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: productId
 *        schema:
 *          type: string
 *        required: true
 *        description: The product id
 *    responses:
 *      204:
 *        description: Product deleted. No content returned
 *      400:
 *        description: Bad request. Invalid id
 *      404:
 *        description: Product not found
 *      500:
 *        description: Something went wrong
 *
 */

export default router;
