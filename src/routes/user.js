

import { Router } from 'express';
// import { isAuthenticated } from './utils/isAuthenticated';

const user = require('../controllers/user.controller.js');
const router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     user:
 *       type: object
 *       required:
 *         - firstname
 *         - lastname
 *         - gender
 *         - email
 *       properties:
 *         firstname:
 *           type: string
 *           description: The first name of the user
 *         lastname:
 *           type: string
 *           description: The last name of the user
 *         gender:
 *           type: string
 *           description: The gender of the user
 *         email:
 *           type: string
 *           description: the email of the user
 *   
 *     userPost:
 *       type: object
 *       required:
 *         - firstname
 *         - lastname
 *         - gender
 *         - email
 *         -  password
 *         -  regnum
 *       properties:
 *         firstname:
 *           type: string
 *           description: The first name of the user
 *         lastname:
 *           type: string
 *           description: The last name of the user
 *         gender:
 *           type: string
 *           description: The gender of the user
 *         email:
 *           type: string
 *           description: the email of the user
 *         password:
 *           type: string
 *           description: The user's password
 *         regnum:
 *           type: integer
 *           description: The registration number of the user
 *         
 */
/**
 * @swagger
 * /user:
 *   get:
 *     summary: gets all users
 *     tags:
 *       - user
 *     responses:
 *        200:
 *          description: the list of users
 *          content:
 *             application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                   $ref: '#/components/schemas/user'
 * 
 * /user/{userId}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: userId
 *     summary: gets single user
 *     tags:
 *       - user
 *     responses:
 *        200:
 *          description: single entry of users
 *          content:
 *             application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                   $ref: '#/components/schemas/user'
 * 
 * /user/createUser:
 *   post:
 *     summary: Create a new user entry
 *     tags:
 *       - user
 *     requestBody:
 *       required:
 *         - firstname
 *         - lastname
 *         - gender
 *         - email
 *         - password
 *         - regnum
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/userPost'
 *     responses:
 *       200:
 *         description: The created user entry
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/userPost'
 *       500:
 *         description: Some server error
 */

router.get('/', user.getAllUsers)

router.get('/:id', user.getUser);

router.post('/createUser', user.registerUser);

// router.post('/delete', user.deleteUser);

// router.post('/update/:id', user.updateUser);

export default router;
