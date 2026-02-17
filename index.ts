import express from "express";

import cors from "cors";

import { ApiError } from "./utils/ApiError";

const server = express();

server.use(
  cors({
    origin: "http://localhost:5173",
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

server.listen(3000, (err?: Error) => {
  if (err) {
    console.log(err);
  } else {
    console.log("server is running on port 3000");
  }
});
