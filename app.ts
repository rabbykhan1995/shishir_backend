import express from "express";
import cors from "cors";
import router from "./routes/allRoutes"; // main router
import { ApiError } from "./utils/ApiError";

const app = express();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

app.use(express.json());

// Routes
app.use("/api", router);

// Centralized error handler
app.use((err: any, req: any, res: any, next: any) => {
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

export default app;
