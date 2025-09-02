import express, { Request, Response } from "express";
import { config } from "dotenv";
import cors from "cors";
import globalErrorHandler from "./middleware/globalErrorHandler";

config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Task Manager - API");
});


app.use(globalErrorHandler);


export default app;