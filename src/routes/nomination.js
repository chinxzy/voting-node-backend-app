

import { Router } from 'express';
const auth = require('../utils/isAuthenticated');

const nomination = require('../controllers/nomination.controller.js');
const router = Router();
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     nomination:
 *       type: object
 *       required:
 *         - nominator
 *         - category
 *         - nominee
 *       properties:
 *         nominationId:
 *           type: integer
 *           description: The id of the nominator
 *         nominator:
 *           type: string
 *           description: The name of the nominator
 *         category:
 *           type: string
 *           description: The position the nominee is nominated for
 *         nominee:
 *           type: string
 *           description: the name of the nominee
 *   
 *     nominationPost:
 *       type: object
 *       required:
 *         - nominator
 *         - category
 *         - nominee
 *         
 *       properties:
 *         nominator:
 *           type: string
 *           description: The name of the nominator
 *         category:
 *           type: string
 *           description: The position the nominee is nominated for
 *         nominee:
 *           type: string
 *           description: the name of the nominee
 *         
 */
/**
 * @swagger
 * /nomination:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     summary: gets all nominations
 *     tags:
 *       - nomination
 *     responses:
 *        200:
 *          description: the list of nomination
 *          content:
 *             application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                   $ref: '#/components/schemas/nomination'
 * 
 * 
 * /nomination/createNomination:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     summary: Create a new nominator entry
 *     tags:
 *       - nomination
 *     requestBody:
 *       required:
 *         - nominator
 *         - category
 *         - nominee
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/nominationPost'
 *     responses:
 *       200:
 *         description: The created nomination entry
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/nominationPost'
 *       500:
 *         description: Some server error
 */

// router.get('/', user.getAllUsers)

// router.get('/:id', user.getUser);

router.post('/createNomination', auth, nomination.createNomination);

// router.post('/delete', user.deleteUser);

// router.post('/update/:id', user.updateUser);

export default router;
