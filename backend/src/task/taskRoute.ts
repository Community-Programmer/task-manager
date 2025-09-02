import { Router } from "express";

import {
	createTask,
	getTasks,
	getTask,
	updateTask,
	deleteTask,
} from "./taskController";
import { authenticate } from "../middleware/auth";


const router = Router();

router.use(authenticate);
router.post("/", createTask);
router.get("/", getTasks);
router.get("/:id", getTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
