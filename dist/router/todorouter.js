"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todocontroller_1 = require("../controller/todocontroller");
const auturization_1 = require("../auth/auturization");
/**
 * @swagger
 * /todos/createtodo:
 *   post:
 *     summary: Create a new ToDo
 *     tags: [ToDo]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               status: { type: string, enum: [ "pending", "completed" ] }
 *     responses:
 *       '201': { description: ToDo created }
 *       '400': { description: Bad Request }

 * /todos/getalltodo:
 *   get:
 *     summary: Get all ToDos
 *     tags: [ToDo]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of ToDos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id: { type: string }
 *                   title: { type: string }
 *                   description: { type: string }
 *                   status: { type: string, enum: [ "pending", "completed" ] }
 *       '401': { description: Unauthorized }

 * /todos/getuser/{id}:
 *   get:
 *     summary: Get ToDo by ID
 *     tags: [ToDo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       '200':
 *         description: ToDo found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: { type: string }
 *                 title: { type: string }
 *                 description: { type: string }
 *                 status: { type: string, enum: [ "pending", "completed" ] }
 *       '404': { description: Not Found }
 *       '401': { description: Unauthorized }

 * /todos/deleteuser/{id}:
 *   delete:
 *     summary: Delete ToDo by ID
 *     tags: [ToDo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       '200': { description: ToDo deleted }
 *       '404': { description: Not Found }
 *       '401': { description: Unauthorized }

 * /todos/updatetodo/{id}:
 *   patch:
 *     summary: Update ToDo by ID
 *     tags: [ToDo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               status: { type: string, enum: [ "pending", "completed" ] }
 *     responses:
 *       '200': { description: ToDo updated }
 *       '400': { description: Bad Request }
 *       '404': { description: Not Found }
 *       '401': { description: Unauthorized }
 */
const Todo = express_1.default.Router();
Todo.post("/createtodo", auturization_1.auth, todocontroller_1.createtodo);
Todo.get("/getalltodo", auturization_1.auth, todocontroller_1.getalltodo);
Todo.get("/getuser/:id", auturization_1.auth, todocontroller_1.getonetodo);
Todo.delete("/deleteuser/:id", todocontroller_1.deletetodo);
Todo.patch("/updatetodo/:id", todocontroller_1.updatetodo);
exports.default = Todo;
