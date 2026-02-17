import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

import { ApiError } from "./utils/ApiError";
import { connectDB } from "./utils/db.config";
const PORT = process.env.PORT || 5000;

const server = express();

// connect DB
connectDB();

server.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

server.use(express.json());

// this portion is used for centralized error handling
server.use((err: any, req: any, res: any, next: any) => {
  console.log(err);
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

server.listen(PORT, (err?: Error) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server is running on port ${PORT}`);
  }
});
