

import { Router } from 'express';
const auth = require('../utils/isAuthenticated');

const vote = require('../controllers/vote.controller.js');
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
 *     vote:
 *       type: object
 *       required:
 *         - voter
 *         - category
 *         - candidate
 *       properties:
 *         voteId:
 *           type: integer
 *           description: The id of the voter
 *         voter:
 *           type: string
 *           description: The name of the voter
 *         category:
 *           type: string
 *           description: The position the candidate is nominated for
 *         candidate:
 *           type: string
 *           description: the name of the candidate
 *   
 *     votePost:
 *       type: object
 *       required:
 *         - voter
 *         - category
 *         - candidate
 *         
 *       properties:
 *         voter:
 *           type: string
 *           description: The name of the voter
 *         category:
 *           type: string
 *           description: The position the candidate is nominated for
 *         candidate:
 *           type: string
 *           description: the name of the candidate
 *         
 */
/**
 * @swagger
 * /vote:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     summary: gets all votes
 *     tags:
 *       - vote
 *     responses:
 *        200:
 *          description: the list of vote
 *          content:
 *             application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                   $ref: '#/components/schemas/vote'
 * 
 * 
 * /vote/addVote:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     summary: Create a new voter entry
 *     tags:
 *       - vote
 *     requestBody:
 *       required:
 *         - voter
 *         - category
 *         - candidate
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/votePost'
 *     responses:
 *       200:
 *         description: The created vote entry
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/votePost'
 *       500:
 *         description: Some server error
 */

// router.get('/', user.getAllUsers)

// router.get('/:id', user.getUser);

router.post('/addVote', auth, vote.addVote);

// router.post('/delete', user.deleteUser);

// router.post('/update/:id', user.updateUser);

export default router;
