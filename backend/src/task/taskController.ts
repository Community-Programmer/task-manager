import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/auth";
import createError from "http-errors";
import { prisma } from "../prismaClient";

// Create a new task (for authenticated user only)
export const createTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
	try {
		const { title, description, status, dueDate, priority } = req.body;
		const userId = req.user?.userId;
		if (!userId) return next(createError(401, "Unauthorized"));
		const task = await prisma.task.create({
			data: { title, description, status, dueDate, priority, userId },
		});
		res.status(201).json(task);
	} catch (err) {
		return next(createError(500, "Failed to create task"));
	}
};

// Get all tasks for authenticated user
export const getTasks = async (req: AuthRequest, res: Response, next: NextFunction) => {
	try {
		const userId = req.user?.userId;
		if (!userId) return next(createError(401, "Unauthorized"));
		const tasks = await prisma.task.findMany({ where: { userId } });
		res.json(tasks);
	} catch (err) {
		return next(createError(500, "Failed to retrieve tasks"));
	}
};

// Get a single task by id (only if owned by user)
export const getTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const userId = req.user?.userId;
		if (!userId) return next(createError(401, "Unauthorized"));
		const task = await prisma.task.findUnique({ where: { id } });
		if (!task || task.userId !== userId) return next(createError(404, "Task not found"));
		res.json(task);
	} catch (err) {
		return next(createError(500, "Failed to retrieve task"));
	}
};

// Update a task (only if owned by user)
export const updateTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const userId = req.user?.userId;
		if (!userId) return next(createError(401, "Unauthorized"));
		// Only update if the task belongs to the user
		const existing = await prisma.task.findUnique({ where: { id } });
		if (!existing || existing.userId !== userId) return next(createError(404, "Task not found"));
		const { title, description, status, dueDate, priority } = req.body;
		const task = await prisma.task.update({
			where: { id },
			data: { title, description, status, dueDate, priority },
		});
		res.json(task);
	} catch (err) {
		return next(createError(500, "Failed to update task"));
	}
};

// Delete a task (only if owned by user)
export const deleteTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const userId = req.user?.userId;
		if (!userId) return next(createError(401, "Unauthorized"));
		const existing = await prisma.task.findUnique({ where: { id } });
		if (!existing || existing.userId !== userId) return next(createError(404, "Task not found"));
		await prisma.task.delete({ where: { id } });
		res.status(204).send();
	} catch (err) {
		return next(createError(500, "Failed to delete task"));
	}
};
