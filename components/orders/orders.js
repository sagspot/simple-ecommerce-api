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

/**
 * @swagger
 * components:
 *  schemas:
 *    Order:
 *      type: object
 *      required:
 *        - product
 *        - quantity
 *      properties:
 *        _id:
 *          type: string
 *          description: The auto-generated id of the product
 *        quantity:
 *          type: number
 *          description: Quantity of product ordered
 *        product:
 *          type: object
 *          properties:
 *            _id:
 *              type: string
 *              description: The id of the product
 *            name:
 *              type: string
 *              description: The name of the product
 *            price:
 *              type: string
 *              description: The price of the product
 *        date:
 *          type: string
 *          description: The auto-generated date of product creation
 *      example:
 *        _id: 437ff7a5-a318-42bb-ab92-1142a9e7f518
 *        quantity: 2
 *        product:
 *            _id: 60cf0c9f544c6d01b0a9a372
 *            name: Phone
 *            price: 1500
 *        date: 2021-06-20T12:51:46.974Z
 */

/**
 * @swagger
 * tags:
 *  name: Orders
 *  description: Create, get, update and delete orders from these routes. You need to be authenticated to access any of these routes.
 */
router.get('/', checkAuth, orders_get_all);
/**
 * @swagger
 * /orders:
 *  get:
 *    summary: Return list of all orders
 *    description: Fetch all orders
 *    tags: [Orders]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: The list of all orders
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Order'
 *      401:
 *        description: Authorization information is missing or invalid
 *      500:
 *        description: Something went wrong
 */

router.post('/', checkAuth, orders_post_create);
/**
 * @swagger
 * /orders:
 *  post:
 *    summary: Add new order
 *    tags: [Orders]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              product:
 *                type: string
 *                example: 60cf36a321f25032b0373654
 *              quantity:
 *                type: number
 *                example: 3
 *    responses:
 *      201:
 *        description: Order successfully added
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Order'
 *      400:
 *        description: Bad request
 *      401:
 *        description: Authorization information is missing or invalid
 *      404:
 *        description: Product not found
 *      500:
 *        description: Something went wrong
 *
 */

router.get('/:orderId', checkAuth, orders_get_order);
/**
 * @swagger
 * /orders/{orderId}:
 *  get:
 *    summary: Fetch an order
 *    tags: [Orders]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: orderId
 *        schema:
 *          type: string
 *        required: true
 *        description: The order id
 *    responses:
 *      200:
 *        description: Order details
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Order'
 *      400:
 *        description: Bad request || Invalid id
 *      401:
 *        description: Authorization information is missing or invalid
 *      404:
 *        description: Order not found
 *      500:
 *        description: Something went wrong
 *
 */

router.patch('/:orderId', checkAuth, orders_patch_order);
/**
 * @swagger
 * /orders/{orderId}:
 *  patch:
 *    summary: Update an order
 *    tags: [Orders]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: orderId
 *        schema:
 *          type: string
 *        required: true
 *        description: The order id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              quantity:
 *                type: number
 *                example: 5
 *    responses:
 *      200:
 *        description: Order updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Order'
 *      400:
 *        description: Bad request || Invalid id
 *      401:
 *        description: Authorization information is missing or invalid
 *      404:
 *        description: Order not found
 *      500:
 *        description: Something went wrong
 *
 */

router.delete('/:orderId', checkAuth, orders_delete);
/**
 * @swagger
 * /orders/{orderId}:
 *  delete:
 *    summary: Delete an order
 *    tags: [Orders]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: orderId
 *        schema:
 *          type: string
 *        required: true
 *        description: The order id
 *    responses:
 *      204:
 *        description: Order deleted. No content returned
 *      400:
 *        description: Bad request || Invalid id
 *      401:
 *        description: Authorization information is missing or invalid
 *      404:
 *        description: Order not found
 *      500:
 *        description: Something went wrong
 *
 */

export default router;
