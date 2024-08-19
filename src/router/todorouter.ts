import express from "express";
import { login, save } from "../controller/usercontroller";
import { createtodo ,getalltodo,getonetodo,deletetodo,updatetodo} from "../controller/todocontroller";
import { auth } from "../auth/auturization";


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


const Todo = express.Router();
Todo.post("/createtodo",auth, createtodo);
Todo.get("/getalltodo",auth, getalltodo);
Todo.get("/getuser/:id",auth, getonetodo);
Todo.delete("/deleteuser/:id", deletetodo);
Todo.patch("/updatetodo/:id", updatetodo);


export default Todo;
