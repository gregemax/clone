import { Request, Response, NextFunction } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import AppDataSource from "../db";
import { todo } from "../entity/todo";
const todoRepository = AppDataSource.getRepository(todo);
export const getalltodo = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
try {
    return response.json({
      todo: todoRepository.find({ where: { User: request["user"].id } }),
    });
} catch (error) {
  response.status(500).json({ message: error.message });
}
};

export const getonetodo = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
try {
    const id = parseInt(request.params.id);

    const user = await todoRepository.findOne({
      where: { id },
    });

    if (!user) {
      return response.send("not found todo");
    }
    return response.json({ user });
} catch (error) {
  response.status(500).json({ message: error.message });
}
};

export const createtodo = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
try {
    let { title, description, status, priority, dueDate } = request.body;

    const user = await todoRepository.create({
      title,
      description,
      status,
      priority,
      dueDate,
    });
    user.createdAt = new Date(Date.now());
    console.log(request["user"].id);

    user.User = request["user"].id;
    const todo = await todoRepository.save(user);

    return response.json({
      todo: todo,
    });
} catch (error) {
  response.status(500).json({ message: error.message });
}
};

export const deletetodo = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
try {
    const id = parseInt(request.params.id);

    let userToRemove = await todoRepository.findOneBy({ id });

    if (!userToRemove) {
      return response.send("this user not exist");
    }

  await todoRepository.delete({ id: userToRemove.id });

    return response.send("user has been removed");
} catch (error) {
  response.status(500).json({ message: error.message });
}
};


export const updatetodo = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log("hi");
  
  try {
    const object = Object.assign({ updatedAt: new Date(Date.now()) }, request.body);
    console.log(object);
    
    const updatetod = await todoRepository.update(
      parseInt(request.params.id),
      object
    );
    response.json({ message: "todo updated successfully" });
} catch (error) {
 response.status(500).json({ message: error.message });
}
};