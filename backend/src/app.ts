import express from "express";
import { config } from "dotenv";
import cors from "cors";

config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Task Manager - API");
}); 


export default app;