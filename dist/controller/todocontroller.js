"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatetodo = exports.deletetodo = exports.createtodo = exports.getonetodo = exports.getalltodo = void 0;
const db_1 = __importDefault(require("../db"));
const todo_1 = require("../entity/todo");
const todoRepository = db_1.default.getRepository(todo_1.todo);
const getalltodo = (request, response, next) => {
    try {
        return response.json({
            todo: todoRepository.find({ where: { User: request["user"].id } }),
        });
    }
    catch (error) {
        response.status(500).json({ message: error.message });
    }
};
exports.getalltodo = getalltodo;
const getonetodo = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(request.params.id);
        const user = yield todoRepository.findOne({
            where: { id },
        });
        if (!user) {
            return response.send("not found todo");
        }
        return response.json({ user });
    }
    catch (error) {
        response.status(500).json({ message: error.message });
    }
});
exports.getonetodo = getonetodo;
const createtodo = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { title, description, status, priority, dueDate } = request.body;
        const user = yield todoRepository.create({
            title,
            description,
            status,
            priority,
            dueDate,
        });
        user.createdAt = new Date(Date.now());
        console.log(request["user"].id);
        user.User = request["user"].id;
        const todo = yield todoRepository.save(user);
        return response.json({
            todo: todo,
        });
    }
    catch (error) {
        response.status(500).json({ message: error.message });
    }
});
exports.createtodo = createtodo;
const deletetodo = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(request.params.id);
        let userToRemove = yield todoRepository.findOneBy({ id });
        if (!userToRemove) {
            return response.send("this user not exist");
        }
        yield todoRepository.delete({ id: userToRemove.id });
        return response.send("user has been removed");
    }
    catch (error) {
        response.status(500).json({ message: error.message });
    }
});
exports.deletetodo = deletetodo;
const updatetodo = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hi");
    try {
        const object = Object.assign({ updatedAt: new Date(Date.now()) }, request.body);
        console.log(object);
        const updatetod = yield todoRepository.update(parseInt(request.params.id), object);
        response.json({ message: "todo updated successfully" });
    }
    catch (error) {
        response.status(500).json({ message: error.message });
    }
});
exports.updatetodo = updatetodo;
