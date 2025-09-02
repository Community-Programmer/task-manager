import express, { Request, Response } from "express";
import { config } from "dotenv";
import cors from "cors";

import globalErrorHandler from "./middleware/globalErrorHandler";

import taskRouter from "./task/taskRoute";
import authRouter from "./auth/authRoute";

config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());


app.get("/", (req: Request, res: Response) => {
  res.send("Task Manager - API");
});


app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);
app.use(globalErrorHandler);


export default app;