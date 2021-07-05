import express from 'express';
import {
  users_get_all,
  users_post_register,
  users_post_login,
  users_delete,
} from './userController.js';
import checkAuth from '../middlewares/auth.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - name
 *        - email
 *        - password
 *      properties:
 *        _id:
 *          type: string
 *          description: The auto-generated id of the user
 *        name:
 *          type: string
 *          description: The name of the user
 *        email:
 *          type: string
 *          description: The email of the user
 *        date:
 *          type: string
 *          description: The auto-generated date of registration
 *      example:
 *        _id: 437ff7a5-a318-42bb-ab92-1142a9e7f518
 *        name: John Doe
 *        email: johndoe@gmail.com
 *        date: 2021-06-20T12:51:46.974Z
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: Create, get, update and delete users from these routes. You have to be authenticated to delete a user, and you can only delete the authenticated user, not other users
 */

router.get('/', users_get_all);
/**
 * @swagger
 * /users:
 *  get:
 *    summary: Return list of all users
 *    description: Fetch all users
 *    tags: [Users]
 *    responses:
 *      200:
 *        description: The list of all users
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 *      500:
 *        description: Something went wrong
 */

router.post('/register', users_post_register);
/**
 * @swagger
 * /users/register:
 *  post:
 *    summary: Add new user
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Collins Aman
 *              email:
 *                type: string
 *                example: collo@mail.com
 *              password:
 *                type: string
 *                example: 1234
 *    responses:
 *      200:
 *        description: User successfully added
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      400:
 *        description: Bad request
 *      409:
 *        description: Email already exist
 *
 */

router.post('/login', users_post_login);
/**
 * @swagger
 * /users/login:
 *  post:
 *    summary: Login user.
 *    description: Email and password have to match those in database to login.
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                example: collo@mail.com
 *              password:
 *                type: string
 *                example: 1234
 *    responses:
 *      200:
 *        description: Auth successfull
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      400:
 *        description: Missing email or password
 *      401:
 *        description: Authorization information is missing or invalid
 *      409:
 *        description: Authentication failed. Incorrect username or password
 */

router.delete('/', checkAuth, users_delete);
/**
 * @swagger
 * /users:
 *  delete:
 *    summary: Delete user.
 *    description: Login and delete user. Can only delete currently authenticated user (delete self).
 *    tags: [Users]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      204:
 *        description: Product deleted. No content returned
 *      401:
 *        description: Authorization information is missing or invalid
 *      400:
 *        description: Something went wrong
 */

export default router;
