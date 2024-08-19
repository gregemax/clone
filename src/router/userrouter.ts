import express from "express";
import { all, del, login, one, save } from "../controller/usercontroller";

const router = express.Router();
/**
 * @swagger
 * /users/login:
 *   post:
 *     tags: [Users]
 *     summary: Login, returns JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       '200': { description: JWT token }
 *       '400': { description: Bad Request }
 *
 * /users/signup:
 *   post:
 *     tags: [Users]
 *     summary: Register new users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               password: { type: string }
 *               email: { type: string }
 *               confirmpassword: { type: string }
 *     responses:
 *       '201': { description: Users registered }
 *       '400': { description: Bad Request }
 *
 * /users/getallusers:
 *   get:
 *     tags: [Users]
 *     summary: Get all userss
 *     responses:
 *       '200': 
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id: { type: string }
 *                   usersname: { type: string }
 *                   email: { type: string }
 *
 * /users/getuser/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get users by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       '200': { description: Users found }
 *       '404': { description: Not found }
 *
* /users/deleteuser/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User deleted
 *       '404':
 *         description: User not found
 */


router.post("/login", login);
router.post("/signup", save);
router.get("/getallusers", all);
router.get("/getuser/:id", one);
router.delete("/deleteuser/:id", del);

export default router;
