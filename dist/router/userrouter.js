"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usercontroller_1 = require("../controller/usercontroller");
const router = express_1.default.Router();
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
router.post("/login", usercontroller_1.login);
router.post("/signup", usercontroller_1.save);
router.get("/getallusers", usercontroller_1.all);
router.get("/getuser/:id", usercontroller_1.one);
router.delete("/deleteuser/:id", usercontroller_1.del);
exports.default = router;
