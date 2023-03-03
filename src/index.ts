import express, { Request, Response } from "express";
import * as dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

/// More things should go here

app.get("/", (req: Request, res: Response): void => {
  res.json({
    message: "Welcome to Quick step App backend!",
  });
});

app.listen(port, (): void => {
  console.log(`Server is running on port ${port} 🔥`);
});
