import { Request, Response, NextFunction } from "express";
import { prisma } from "../prismaClient";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createError from "http-errors";

const JWT_SECRET = process.env.JWT_SECRET as string;

// Register a new user
export const register = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			return next(createError(400, "All fields are required"));
		}
		const existingUser = await prisma.user.findUnique({ where: { email } });
		if (existingUser) {
			return next(createError(409, "User already exists"));
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await prisma.user.create({
			data: { name, email, password: hashedPassword },
		});
		res.status(201).json({ message: "User registered successfully", user: { id: user.id, name: user.name, email: user.email } });
	} catch (err) {
        return next(createError(500, "Failed to create user"));
	}
};

// Login user
export const login = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return next(createError(400, "Email and password are required"));
		}
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) {
			return next(createError(401, "Invalid credentials"));
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return next(createError(401, "Invalid credentials"));
		}
		const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
		res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
	} catch (err) {
		return next(createError(500, "Failed to login user"));
	}
};
